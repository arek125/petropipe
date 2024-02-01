import AppExtensionsSDK, {
    Command,
    Modal,
    View,
  } from '@pipedrive/app-extensions-sdk';
  let SDK:any;
  // Initialize SDK and set height. If SDK is already initialized, just return it.
  export const getCustomUISDK = async () => {
    try {
      if (SDK) return SDK;
      SDK = await new AppExtensionsSDK().initialize();
      return SDK;
    } catch (e) {
      console.log('Error during SDK initialization', e);
    }
  };
  
  export const hideFloatingWindow = async (sdk) => {
    console.log('Hiding floating window');
    await sdk.execute(Command.HIDE_FLOATING_WINDOW, {});
  };
  
  export const showFloatingWindow = async (sdk) => {
    console.log('Showing floating window');
    await sdk.execute(Command.SHOW_FLOATING_WINDOW, {});
  };
  
  export const openActivityModal = async (sdk) => {
    console.log('Opening activity modal');
    await sdk.execute(Command.OPEN_MODAL, {
      type: Modal.ACTIVITY,
    });
  };
  
  export const redirectToContact = async (sdk, id) => {
    console.log(`Redirecting to ${id}`);
    await sdk.execute(Command.REDIRECT_TO, { view: View.CONTACTS, id });
  };
  
  export const setNotification = async (sdk, number) => {
    console.log(`Updating notification count to ${number}`);
    await sdk.execute(Command.SET_NOTIFICATION, {
      number,
    });
  };