const fetch = require('node-fetch');

const max = (text, target_length = 68, fill_char = "20") => {
  if (text.length > target_length) {
    return text.slice(0, target_length);
  } else if (text.length < target_length) {
    const fill_length = target_length - text.length;
    return text + fill_char.repeat(Math.ceil(fill_length / fill_char.length)).slice(0, fill_length);
  } else {
    return text;
  }
};

const enc = async (id) => {
  const api_url = `https://api-fadai-server.vercel.app/FFcrypto/${id}`;
  try {
    const response = await fetch(api_url);
    if (response.ok) {
      return await response.text();
    } else {
      return "cee2bc8d24";
    }
  } catch (error) {
    return "cee2bc8d24";
  }
};

const message = async (id_admin, name, id) => {
  const msg = Buffer.from(name, 'utf-8').toString('hex');
  const name_padded = max(msg);
  const rok = await enc(id);
  const packet = `050000022008${id_admin}1005203f2a930408${id_admin}12024d451801200332da0208${id_admin}120c504547415355532d544553541a024d45209fe5f6b40628013085cbd1303832421880c3856680a89763c0b5ce64c09ae061c091e6608096a361480150c90158e80792010801090a0b12191e209801c901c00101e801018802089202029603aa0208080110e43218807daa0209080f10e43218f0ab01aa0205080210e432aa0205081810e432aa0205081a10e432aa0205081c10e432aa0205082010e432aa0205082210e432aa0205082110e432aa0205081710e432aa0205082310e432aa0205082b10e432aa0205083110e432aa0205083910e432aa0205083d10e432aa0205084110e432aa0205084910e432aa0205084d10e432aa0205081b10e432aa0205083410e432aa0205082810e432aa0205082910e432c2022712031a01001a060851120265661a0f0848120b0104050607f1a802f4a8021a0508501201632200ea0204100118018a03020801920300e20301523a0101400150016801721e313732313631303931313438313233393736335f6d65743364786a727a78880180e0aef1eca5b79819a20100b001e201ea010449444332f2014208${id_admin}10${rok}1a22${name_padded}28e0e5f6b406300138014204100118014801fa011e313732313631303931313438313234333137395f633432736a7a65306863`;
  return packet;
};

export default async (req, res) => {
  const { id_admin, name, id } = req.query;

  if (!id_admin || !name || !id) {
    return res.status(400).json({ error: "id_admin, name, and id parameters are required" });
  }

  try {
    const result = await message(id_admin, name, id);
    res.status(200).json({ packet: result });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};
