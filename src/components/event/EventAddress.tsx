import { Field, RichText, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { JSX } from 'react';

interface Fields {
  addressLabel: Field<string>;
  address: Field<string>;
  contactUsLabel: Field<string>;
  contactDetails: Field<string>;
}

type EventAddressProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const EventAddressDefaultComponent = (props: EventAddressProps): JSX.Element => (
  <div className={`component event-address ${props?.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Event Address</span>
    </div>
  </div>
);

export const Default = (props: EventAddressProps): JSX.Element => {
  const { fields } = props;
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div
        className={`component event-address flex flex-col items-center min-h-64 justify-center ${props?.params?.styles}`}
        id={id ? id : undefined}
      >
        <Text tag="h2" className="font-semibold text-2xl" field={fields?.addressLabel} />
        <RichText field={fields?.address} className="text-gray-700 text-base mt-2" />
        <Text tag="h2" className="font-semibold mt-4 text-2xl" field={fields?.contactUsLabel} />
        <Text tag="p" className="text-base text-gray-700 mt-2" field={fields?.contactDetails} />
      </div>
    );
  }
  return <EventAddressDefaultComponent {...props} />;
};
