import ShortUniqueId from "short-unique-id";

const uid = new ShortUniqueId();
const randomId = (len = 10) => uid.rnd(len);

export default randomId;
