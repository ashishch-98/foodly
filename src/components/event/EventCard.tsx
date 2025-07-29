import { JSX } from 'react';
import {
  NextImage as JssImage,
  Link as JssLink,
  RichText as JssRichText,
  ImageField,
  Field,
  LinkField,
  Text,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  eventImage: ImageField;
  linkToBuyTickets: LinkField;
  date: Field<string>;
  genre: Field<string>;
  heading: Field<string>;
  description: Field<string>;
}

type EventCardProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const EventCardDefaultComponent = (props: EventCardProps): JSX.Element => (
  <div className={`component event-card ${props?.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Event Card</span>
    </div>
  </div>
);

export const Default = (props: EventCardProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const id = props.params.RenderingIdentifier;
  const { fields } = props;
  console.log(sitecoreContext);
  if (props.fields) {
    const date = fields.date?.value;
    return (
      <div className={`component event-card ${props?.params?.styles}`} id={id ? id : undefined}>
        <JssImage
          field={fields?.eventImage}
          className={`rounded  h-auto mb-2 ${sitecoreContext?.pageEditing ? 'w-72 ' : 'w-full'}`}
        />
        <Text tag="h3" className="font-semibold text-2xl" field={fields?.heading} />
        <JssRichText className="text-xl text-gray-600" field={fields?.description} />
        <Text tag="p" className="font-semibold text-lg my-0.5" field={fields?.genre} />
        <p className="text-lg text-gray-500 mb-3">
          {new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <JssLink
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
          field={fields?.linkToBuyTickets}
        />
      </div>
    );
  }

  return <EventCardDefaultComponent {...props} />;
};
