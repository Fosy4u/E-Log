export const getTitle = (contact) => {

  if (contact?.companyName) return contact?.companyName;

  return `${contact?.firstName} ${contact?.lastName}`;
};
