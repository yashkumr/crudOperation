import mongoose from "mongoose";
import color from "colors"


const connectdb = async() => {
  try {
    const conn = await mongoose.connect(process.env.MOGO_URL);

    console.log(
      `data connected successfully ${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.log(`error  in mongdb ${error}.bgRed.white`);
  }
};
export default connectdb;