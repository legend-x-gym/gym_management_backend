import prisma from "../utils/prisma";
import randomId from "../utils/randomId";

const getOffers = async (req, res) => {
  try {
    const offers = await prisma.offer.findMany();
    res.status(200).json({ message: "Ok" }, offers);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "error fetching offers", error: err });
  }
};

const getoOffer = async (req, res) => {
  const { id: offerId } = req.body;
  if (!id) res.status(400).json({ message: "Id is required to get offer." });
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
  const { title, base, discounted, services, imgUrl } = req.body;
  if (!id) res.status(400).json({ message: "Id is required to get offer." });
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

const deleteOffer = async (req, res) => {
  const { id } = req;
  try {
    await prisma.offer.delete({
      where: {
        offerId: id,
      },
    });
    res.status(200).json({ message: "offer deleted succesfully." });
  } catch (err) {
    console.error(err.message);
    res.status(200).json({ message: "Failed to delete offer", error: err });
  }
};
