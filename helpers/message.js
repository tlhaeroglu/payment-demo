export function success(message) {
  return {
    success: true,
    message: message,
  };
}

export function send(data) {
  return {
    success: true,
    data: data,
  };
}

export function failure(message) {
  return {
    success: false,
    error: message,
  };
}
