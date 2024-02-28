import { ModuleFederationConfig } from '@nx/webpack'

const config: ModuleFederationConfig = {
    name: 'validation',
    exposes: {
        './Routes': 'apps/validation/src/app/remote-entry/entry.routes.ts',
    },
}

export default config
