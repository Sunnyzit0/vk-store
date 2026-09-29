import { content } from '../data/content';

const { contact, location } = content;

export const whatsappLink = (message: string = contact.defaultMessage) =>
  `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;

const coords = `${location.geo.lat},${location.geo.lng}`;

export const mapsLinks = {
  open: `https://www.google.com/maps/search/?api=1&query=${coords}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${coords}`,
  embed: `https://maps.google.com/maps?q=${coords}&z=16&output=embed`,
};
