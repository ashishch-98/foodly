import { ComponentParams, ComponentRendering, Field } from '@sitecore-jss/sitecore-jss-nextjs';

export interface Fields {
  sectionTitle: Field<string>;
  sectionSubTitle: Field<string>;
  eventId: Field<string>;
}

export type EventSectionProps = {
  params: { [key: string]: string };
  fields: Fields;
  rendering: ComponentRendering & { params: ComponentParams };
};
