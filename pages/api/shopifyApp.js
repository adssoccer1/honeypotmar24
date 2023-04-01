// pages/api/shopifyApp.js

export default async function handler(req, res) {
    console.log("shopify install/unistall endpoint hit");
    if (req.method === 'POST') {
      const { shopUrl, action } = req.body;
      console.log("shopify install/unistall endpoint url", shopUrl, " and action ", action);

      if (!shopUrl || !action) {
        res.status(400).json({ error: 'Invalid request. Both shopifyStoreUrl and action are required.' });
        return;
      }
  
      try {
        switch (action) {
          case 'install':
            // Handle the installation event
            await handleInstall(shopUrl);
            res.status(200).json({ message: 'Installation event processed successfully.' });
            break;
  
          case 'uninstall':
            // Handle the uninstallation event
            await handleUninstall(shopUrl);
            res.status(200).json({ message: 'Uninstallation event processed successfully.' });
            break;
  
          default:
            res.status(400).json({ error: 'Invalid action. Action must be either "install" or "uninstall".' });
            break;
        }
      } catch (error) {
        console.error('Error processing the event:', error);
        res.status(500).json({ error: 'An error occurred while processing the event.' });
      }
    } else {
      res.status(405).json({ error: 'Method not allowed. Please use POST.' });
    }
  }
  
  async function handleInstall(shopUrl) {
    // Add your logic for handling the installation event
    console.log(`Handling installation for store: ${shopUrl}`);
  }
  
  async function handleUninstall(shopUrl) {
    // Add your logic for handling the uninstallation event
    console.log(`Handling uninstallation for store: ${shopifyStoreUrl}`);
  }
  