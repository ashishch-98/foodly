import { fetchGraphQL } from '../fetcher';
import { BUTTON_SITE_SETTINGS_QUERY } from '../query/ButtonQuery';

interface FieldValue {
  value: string;
}

interface JsonValue {
  id: string;
  url: string;
  name: string;
  displayName: string;
  fields: {
    name: FieldValue;
  };
}

export type SiteSettingsResponse = {
  item: {
    backgroundColor: { jsonValue: JsonValue };
    labelColor: { jsonValue: JsonValue };
  };
};

export async function getButtonSiteSettings() {
  try {
    const response = await fetchGraphQL(BUTTON_SITE_SETTINGS_QUERY);

    if (response.errors) {
      console.error('GraphQL Errors:', response.errors);
      return null;
    }

    return response.data as SiteSettingsResponse;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
}
