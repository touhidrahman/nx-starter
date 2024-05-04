import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
    appId: 'io.ionic.starter',
    appName: 'example-ionic',
    webDir: '../../dist/apps/example-ionic',
    bundledWebRuntime: false,
    server: {
        androidScheme: 'https',
    },
}

export default config
