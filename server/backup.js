const { compile_fonts } = require('./compile');
const { local_client } = require('./utils/connect');
async function backup() {
  const data = await compile_fonts();
  for (const font in data){
    const { name,cid,size } = data[font];
    // upload collection

    // update meta
  }
}
