import prisma from "../utils/prisma.js";
import { deleteImage } from "../utils/utils.js";

const getOffers = async (req, res) => {
  try {
    const offers = await prisma.offer.findMany({
      orderBy: { paymentDuration: "asc" },
    });
    res.status(200).json({ message: "Succesfull", offers });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "error fetching offers", error: err });
  }
};

const getoOffer = async (req, res) => {
  const { id: offerId } = req.body;
  if (!offerId)
    res.status(400).json({ message: "Id is required to get offer." });
  try {
    const offer = await prisma.offer.findUnique({
      where: { offerId },
    });
    res.status(200).json({ offer });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: `Failed to fetch offer-${offerId}`,
      error: err.message,
    });
  }
};

const createOffer = async (req, res) => {
  const {
    title,
    base,
    discounted,
    services,
    id: offerId,
    paymentDuration,
    gymId,
    ext,
  } = req.body;
  try {
    console.log(req.body);
    const offer = await prisma.offer.create({
      data: {
        offerId,
        title,
        discounted: parseFloat(discounted),
        base: parseFloat(base),
        services: JSON.parse(services),
        paymentDuration: parseInt(paymentDuration),
        offerImg: `uploads/offers/${offerId}${ext}`,
        gym: { connect: { gymId } },
      },
    });
    res.status(200).json({ offer });
  } catch (err) {
    console.log(err.message);
    deleteImage(offerId, "offers");
    res.status(500).json({
      message: `Failed to upload offer plan.`,
      error: err.message,
    });
  }
};

const updateOffer = async (req, res) => {
  const { id: offerId } = req.params;
  const { title, base, discounted, services, paymentDuration, ext } = req.body;

  req.file && (await deleteImage(offerId, "offers", ext));

  try {
    const offer = await prisma.offer.update({
      where: { offerId },
      data: {
        offerId,
        title,
        discounted: parseFloat(discounted),
        base: parseFloat(base),
        services: JSON.parse(services),
        paymentDuration: paymentDuration
          ? parseInt(paymentDuration)
          : undefined,
        offerImg: req.file ? `uploads/offers/${offerId}${ext}` : undefined,
      },
    });
    res.status(200).json({ offer });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: `Failed to upload offer plan.`,
      error: err.message,
    });
  }
};

const deleteOffer = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.offer.delete({
      where: {
        offerId: id,
      },
    });
    deleteImage(id, "offers");
    res.status(200).json({ message: "offer deleted succesfully." });
  } catch (err) {
    console.error(err.message);
    res.status(200).json({ message: "Failed to delete offer", error: err });
  }
};

export { createOffer, updateOffer, deleteOffer, getOffers, getoOffer };
