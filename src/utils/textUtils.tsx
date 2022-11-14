export const truncateString = (input: string, count: number) => {
  if (input.length > count) {
    return input.substring(0, count) + '...';
  }
  return input;
};

export const validateUser = (userRole: string) => {
  const validUser: any = {
    Communication: true,
    Root: true,
    HR: true,
    Leader: true,
  };
  return validUser[userRole] || false;
};

export const validateHasTab = (userRole: string) => {
  const validUser: any = {
    Root: true,
    HR: true,
    Leader: true,
  };
  return validUser[userRole] || false;
};

export const validateUserNews = (userRole: string) => {
  const validUser: any = {
    Communication: true,
    Root: true,
    HR: true,
  };
  return validUser[userRole] || false;
};
