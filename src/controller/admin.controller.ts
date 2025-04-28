import { Response, Request } from "express";
import { AdminModel } from "../models/admin.model";
import {
  AdminBody,
  CustomRequest,
  CustomResponse,
} from "../interface/interface";
import { ErrorHandler } from "../helpers/ErrorHandler";

// READ all admins
const getAdmins = async (req: Request, res: Response): Promise<void> => {
  try {
    // Searching all admins
    const admins = await AdminModel.findAll({
      where: { isDeleted: false },
    });

    // if not found admins in the DDBB.
    if (!admins || admins.length === 0) {
      return ErrorHandler(
        {
          statusCode: 404,
          message: "No se encontraron administradores en la base de datos",
        },
        res,
      );
    }

    const dataResponse: CustomResponse = {
      status: "success",
      message: "Administradores encontrados",
      data: admins,
    };
    res.status(201).json(dataResponse);
  } catch (err) {
    console.log(err);
    return ErrorHandler(
      {
        statusCode: 400,
        message: "la solicitud no ha podido ser gestionada adecuadamente.",
      },
      res,
    );
  }
};

// READ user by ID
const getAdminById = async (
  req: CustomRequest<AdminBody>,
  res: Response,
): Promise<void> => {
  try {
    // Read the ?id from the request parameters
    const { _id } = req.params;

    console.log("Received ID:", _id);
    const adminId = parseInt(_id);

    // if _id in not found
    if (!_id || isNaN(adminId)) {
      return ErrorHandler(
        {
          statusCode: 404,
          message: "No se encontró el id del administrador",
        },
        res,
      );
    }

    // Searching admin by id
    const admin = await AdminModel.findOne({
      where: { _id: adminId, isDeleted: false },
    });

    // if not found admin in the DDBB.
    if (!admin) {
      return ErrorHandler(
        {
          statusCode: 404,
          message: "No se encontró el administrador en la base de datos",
        },
        res,
      );
    }

    const dataResponse: CustomResponse = {
      status: "success",
      message: "Administrador creado correctamente",
      data: admin,
    };
    res.status(201).json(dataResponse);
  } catch (err) {
    console.log(err);
    return ErrorHandler(
      {
        statusCode: 400,
        message: "la solicitud no ha podido ser gestionada adecuadamente.",
      },
      res,
    );
  }
};

// CREATE admin
const createAdmin = async (
  req: CustomRequest<AdminBody>,
  res: Response,
): Promise<void> => {
  try {
    // Read the body from the request
    const adminBody = req.body;
    console.log("Received body:", adminBody);

    // if _id in not found
    if (!adminBody) {
      return ErrorHandler(
        { statusCode: 400, message: "El cuerpo de la solicitud está vacío" },
        res,
      );
    }

    const {
      hasPermissions,
      isDeleted,
      lastName,
      password,
      adminDni,
      email,
      name,
    } = adminBody as AdminBody;

    const allAdmins = (await AdminModel.findAll()).map((admin) =>
      admin.toJSON(),
    );
    const sameAdmin = allAdmins.filter((admin: AdminBody) => {
      if (admin.adminDni === adminDni && admin.isDeleted === false) {
        return admin;
      }
    });
    const totalAdmins = allAdmins.length;

    if (sameAdmin && sameAdmin.length > 0) {
      return ErrorHandler(
        { statusCode: 409, message: "Ya existe un admin con ese DNI" },
        res,
      );
    }

    // Creating new admin
    const newAdmin = {
      _id: totalAdmins + 1,
      adminDni,
      name,
      lastName,
      email,
      password,
      hasPermissions,
      isDeleted,
    };
    const data = await AdminModel.create(newAdmin);
    // console.log("---> data:", data);

    // Admin created
    const dataResponse: CustomResponse = {
      status: "success",
      message: "Administrador creado correctamente",
      data: data,
    };
    res.status(201).json(dataResponse);
  } catch (err) {
    console.log(err);
    return ErrorHandler(
      {
        statusCode: 400,
        message: "la solicitud no ha podido ser gestionada adecuadamente.",
      },
      res,
    );
  }
};

// UPDATE admin by ID
const updateAdmin = async (
  req: CustomRequest<AdminBody>,
  res: Response,
): Promise<void> => {
  try {
    const { _id } = req.params;
    if (!_id || !req.body) {
      return ErrorHandler(
        { statusCode: 404, message: "Problemas con la solicitud." },
        res,
      );
    }
    const adminId = parseInt(_id);
    const adminFound = (await AdminModel.findOne({
      where: { _id: adminId, isDeleted: false },
    }));

    if (!adminFound) {
      return ErrorHandler(
        {
          statusCode: 404,
          message: "No se encontró el administrador en la base de datos",
        },
        res,
      );
    }
    console.log("adminFound --> ", adminFound);
    const {
      hasPermissions,
      isDeleted,
      lastName,
      adminDni,
      password,
      email,
      name,
    } = req.body as AdminBody;

    const adminUpdated = {
      _id: adminId,
      hasPermissions,
      isDeleted,
      lastName,
      adminDni,
      password,
      email,
      name,
    };

    adminFound.set(adminUpdated);
    await adminFound.save();

    const dataResponse: CustomResponse = {
      status: "success",
      message: "el administrado ha sido actualizado satisfactoriamente!",
      data: null,
    };

    res.status(200).json(dataResponse);
  } catch (err) {
    console.log(err);
    return ErrorHandler(
      {
        statusCode: 400,
        message: "la solicitud no ha podido ser gestionada adecuadamente.",
      },
      res,
    );
  }
};

// UPDATE admin by ID
/* const updateAdminPermissions = async (
  req: Request,
  res: Response,
): Promise<void> => {}; */

// DELETE (HARD) user by ID
const hardDeleteAdmin = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { _id } = req.params;

    if (!_id || !parseInt(_id)) {
      return ErrorHandler(
        { statusCode: 404, message: "No fue suministrada un id del administrador" },
        res,
      );
    }
    const adminId = parseInt(_id);
    const adminToDelete = await AdminModel.findOne({
      where: { _id: adminId, isDeleted: false },
    });

    if (!adminToDelete) {
      return ErrorHandler(
        {
          statusCode: 404,
          message: "No se encontró el administrador en la base de datos",
        },
        res,
      );
    }

    await adminToDelete.destroy();

    const dataResponse: CustomResponse = {
      status: "success",
      message: "el administrador ha sido eliminado satisfactoriamente!",
      data: null,
    };

    res.status(200).json(dataResponse);
  } catch (err) {
    console.log(err);
    return ErrorHandler(
      {
        statusCode: 400,
        message: "la solicitud no ha podido ser gestionada adecuadamente.",
      },
      res,
    );
    
  }
};

// DELETE (SOFT) user by ID
/* const softDeleteAdmin = async (
  req: Request,
  res: Response,
): Promise<void> => {}; */

export {
  // updateAdminPermissions,
  // softDeleteAdmin,
  hardDeleteAdmin,
  getAdminById,
  createAdmin,
  updateAdmin,
  getAdmins,
};
