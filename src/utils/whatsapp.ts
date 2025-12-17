/**
 * WhatsApp phone numbers for contact
 */
const WHATSAPP_NUMBERS = [
  '5533991585259',
  '5533991178717',
] as const;

/**
 * Gets a random WhatsApp URL from the available phone numbers
 * @returns A WhatsApp API URL with a randomly selected phone number
 */
export const getRandomWhatsAppUrl = (): string => {
  const randomIndex = Math.floor(Math.random() * WHATSAPP_NUMBERS.length);
  const phoneNumber = WHATSAPP_NUMBERS[randomIndex];
  return `https://api.whatsapp.com/send?phone=${phoneNumber}`;
};

/**
 * Opens WhatsApp with a random phone number in a new window/tab
 */
export const openWhatsApp = (): void => {
  const url = getRandomWhatsAppUrl();
  window.open(url, '_blank', 'noopener,noreferrer');
};

