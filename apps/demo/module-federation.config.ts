import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'demo',
  remotes: [
    // Add LenderLink as a remote
    // The name 'lenderLink' is what you'll use in your code
    // The URL is where the remote application is running
     ['lenderLink', 'http://localhost:4203'],
  ],
};

export default config;