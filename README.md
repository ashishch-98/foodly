# Sitecore Headless SXA Next.js Application

## 🛠️ Prerequisites

Before getting started, ensure the following are installed:

- Node.js LTS version `v22.17.1`
- Sitecore XP 10.4 with SXA and has following packages installed:
  * [Sitecore Headless Services](https://developers.sitecore.com/downloads/Sitecore_Headless_Rendering) 22.x
  * [Sitecore Management Services](https://doc.sitecore.com/xp/en/developers/100/developer-tools/sitecore-management-services.html) (installed via package on CM)
  * Add "Spanish (Mexico) in languages".

## 📁 Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ashishch-98/foodly.git
cd foodly
```

or you can unzip the folder from the attachments.

### 2. Install Dependencies

```
npm install -g @sitecore-jss/sitecore-jss-cli

dotnet new tool-manifest

dotnet tool install Sitecore.CLI --add-source https://sitecore.myget.org/F/sc-packages/api/v3/index.json
```

### 3. Configure Environment

1. Create a copy of `.env` and rename it to `.env.local`
2. Update the values as shown below:

   PUBLIC_URL= //your frontend host ex:- http://localhost:3000

   JSS_EDITING_SECRET=your-32-character-guid

   SITECORE_API_KEY=your-api-key //you can get it from /sitecore/system/Settings/Services/API Keys

   SITECORE_API_HOST=your-sitecore-host //make sure to not have a / at the end of URL

   SITECORE_ID_HOST=your-sitecore-host-id-server // ex - https://localsitecoreidentityserver.dev.local

   NODE_TLS_REJECT_UNAUTHORIZED=0

   TICKETS_API_BASE_URL=https://your-dotnet-api-url

   TICKETS_API_KEY=your-dotnet-api-key //should be same as the key added in appsettings.json

### 4. Update Sitecore Configs

1. Remove .example from the file /sitecore/config/foodly.deploysecret.config.example and add a guid to `deploymentSecret`.

2. Edit sitecore/config/foodly.config and update the following:
   Set `JavaScriptServices.ViewEngine.Http.JssEditingSecret` to match your .env.local value.

  Verify your FE endpoint is same as added here and update the same for sitecore rendering host
  `serverSideRenderingEngineEndpointUrl`
  `serverSideRenderingEngineApplicationUrl`.

### 5. Configure Next.js Image Domains

In `next.config.js`, allow Sitecore images by adding:

```
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'localsitecore.dev.local', // replace with your Sitecore domain
      pathname: '**',
    },
  ],
},
```

## Run Initial Setup & Start:

#### Ensure your .NET Solution is running first!

In your project terminal run ``npm run init`` this will install the dependencies and run setup for sitecore items using sitecore serialization.

If the above command fails you can run the steps manually in the following order:

```
jss deploy config        #Deploys sitecore configs to your AppConfig folder

npm install              #Installs dependencies

npm run sc:login         #Authenticates the terminal to perform serialization

npm run sc:push          #Pushes Sitecore items from local repo to CM

npm run start:connected  # Starts Next.js in connected mode
```

## ⚠️ Troubleshooting (Common Issues)

* **API/EE not working:** Check `.env.local` values, ensure backend APIs are running, and verify Sitecore config matches.
* **Serialization errors:** Confirm Sitecore CLI login (`dotnet sitecore login`) and Management Services are installed.
* **Images broken:** Verify `next.config.js` `images.remotePatterns` entry.
