import { JSX } from 'react';
import { EventSectionProps } from './types';
import { EventSection } from './EventSection';

const EventSectionDefaultComponent = (props: EventSectionProps): JSX.Element => (
  <div className={`component event-section ${props?.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Event section</span>
    </div>
  </div>
);

export const Default = (props: EventSectionProps): JSX.Element => {
  return props.fields ? (
    <EventSection {...props} isTwoColumnVariant={false} />
  ) : (
    <EventSectionDefaultComponent {...props} />
  );
};

export const TwoColumnsSection = (props: EventSectionProps): JSX.Element => {
  return props.fields ? (
    <EventSection {...props} isTwoColumnVariant={true} />
  ) : (
    <EventSectionDefaultComponent {...props} />
  );
};
