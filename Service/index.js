

const findUsers = async (req, res)=>{

      const allusers = await Auth.findOne()

      return allusers
}

module.exports = {
    findUsers
}