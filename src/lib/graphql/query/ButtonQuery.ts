export const BUTTON_SITE_SETTINGS_QUERY = `query {
          item(path: "/sitecore/content/Local Sites/Foodly/Settings", language: "en") {
            backgroundColor: field(name: "backgroundColor") {
              jsonValue
            }
            labelColor: field(name: "labelColor") {
              jsonValue
            }
          }
        }`;
