import { Request, Response } from "express";
import { paginateAppointmentsService } from "../../services/auth.js";

export const getAppointmentsController = async (
  req: Request,
  res: Response,
) => {
  const { _id } = req.user;

  const page = Number(req.query.page);
  const limit = Number(req.query.limit);
  const status = String(req.query.filter) as
    | "pending"
    | "confirmed"
    | "cancelled";

  if (!page || !limit || !status)
    return res.status(400).json({ message: "Paginazione non presente" });

  try {
    const { appointments, totalPages, counts } =
      await paginateAppointmentsService(_id, page, limit, status);

    return res.status(200).json({
      message: "Appuntamenti recuperati",
      data: appointments,
      pagination: {
        hasMore: page < totalPages,
        currentPage: page,
        totalPages: totalPages,
      },
      ...counts,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Errore interno del server" });
  }
};
