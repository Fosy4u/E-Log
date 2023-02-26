// success and error messages get passed through from the slice, via onQueryStarted for each call
// you want it on.

import { globalActions } from "../global/global.slice";



// responseHandler options:
// 1. to pass through a specific success message, pass through an object of {success: 'message'}
// 2. to pass through a specific error message, pass through an object of {error: 'message'}
// 3. to override the success behaviour, ie. show toast with success message, pass through a function of {successHandler}
// 4. to override the error behaviour, ie. show toast with error message, pass through a function of {errorHandler}
// successHandler and errorHandler are callback functions that then gets defined where you're making the api call
// this is commonly done when we want to show the error message as a banner in the modal, and not a toast

const responseHandler = async (
  { success, successHandler, error, errorHandler },
  { dispatch, queryFulfilled }
) => {
  let response;
  try {
    // attempts queryFulfilled to trigger the catch
    const { data } = await queryFulfilled;
    response = data;
    if (successHandler) {
      successHandler(success, data);
    } else if (success) {
      dispatch(
        globalActions.addToast({
          title: success,
          message: 'Request Successful',
        })
      );
    }
  } catch (e) {
    if (errorHandler) {
      const errorToDisplay =
        error || e?.error?.data?.header || 'Something went wrong...';
      errorHandler(errorToDisplay);
    } else if (error) {
      dispatch(
        globalActions.addToast({
          title: error,
          message: 'Request Failed',
          variant: 'error',
        })
      );
    } else {
      const errorTitle = e?.error?.status;
      dispatch(
        globalActions.addToast({
          title:
            typeof errorTitle === 'string'
              ? errorTitle
              : 'Something went wrong...',
          message: e?.error?.data?.header || 'Something went wrong...',
          variant: 'error',
        })
      );
    }
  }
  return response;
};

export default responseHandler;
