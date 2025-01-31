import sequelize from ".";
import dotenv from "dotenv";

dotenv.config();

const connectToDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Connection has been established successfully.");
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error: any) => {
  // Aquí puedes agregar lógica para manejar diferentes tipos de errores
  // Por ejemplo, errores de conexión, errores de autenticación, etc.
  if (error) {
    console.error("Specific error occurred:", error.message);
  } else {
    console.error("An unexpected error occurred:", error);
  }
};

export const connection = async () => {
  await connectToDatabase();
  // Aquí puedes agregar cualquier lógica adicional necesaria para la conexión
};
