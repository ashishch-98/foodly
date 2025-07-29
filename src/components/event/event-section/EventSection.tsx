import { JSX, useEffect, useState } from 'react';
import { Text, Placeholder, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';
import { useI18n } from 'next-localization';
import { EventSectionProps } from './types';

type EventSectionInnerProps = EventSectionProps & {
  isTwoColumnVariant?: boolean;
};

type Tickets = {
  eventId: string;
  remainingTickets: number;
  status: string;
};

export const EventSection = ({
  params,
  fields,
  rendering,
  isTwoColumnVariant,
}: EventSectionInnerProps): JSX.Element => {
  const id = params.RenderingIdentifier;
  const [tickets, setTickets] = useState<Tickets | null>(null);
  const { sitecoreContext } = useSitecoreContext();
  const { t } = useI18n();

  useEffect(() => {
    if (!fields?.eventId?.value) return;

    const fetchTicketsForEvent = async () => {
      try {
        const isEE =
          sitecoreContext?.pageState == 'preview' || sitecoreContext?.pageState == 'edit';
        const url = isEE
          ? `${config.publicUrl}/api/event/tickets?eventId=${fields?.eventId?.value}`
          : `/api/event/tickets?eventId=${fields?.eventId?.value}`;
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const data: Tickets = await res.json();
        setTickets(data);
      } catch (ex) {
        console.error('Exception while fetching tickets:', ex);
      }
    };

    fetchTicketsForEvent();
  }, [fields?.eventId?.value, sitecoreContext.pageEditing, sitecoreContext?.pageState]);

  const gridColsClass = isTwoColumnVariant ? 'md:grid-cols-2' : 'md:grid-cols-3';

  const ticketsColPlacementClass = isTwoColumnVariant
    ? 'md:col-start-2 md:col-span-1'
    : 'md:col-start-2 md:col-span-2';

  return (
    <div
      className={`component event-section max-w-3xl mx-auto border border-gray-200 rounded-lg shadow-sm p-6 pb-8 bg-white my-8 ${params?.styles}`}
      id={id ? id : undefined}
    >
      <div>
        <div className="event-header mb-4">
          <Text className="text-2xl font-semibold" tag="h2" field={fields?.sectionTitle} />
          <Text
            className="text-lg text-gray-500 uppercase"
            tag="p"
            field={fields?.sectionSubTitle}
          />
        </div>

        <div className={`grid grid-cols-1 ${gridColsClass} gap-4 grid-rows-[auto_auto]`}>
          <div className="md:col-span-1 md:row-span-2">
            <Placeholder name={`event-col-1-{*}`} rendering={rendering} />
          </div>

          <div className="md:col-span-1">
            <Placeholder name={`event-col-2-{*}`} rendering={rendering} />
          </div>

          {!isTwoColumnVariant && (
            <div className="md:col-span-1">
              <Placeholder name={`event-col-3-{*}`} rendering={rendering} />
            </div>
          )}

          {tickets?.remainingTickets !== undefined && (
            <div
              className={`${ticketsColPlacementClass} md:col-span-2 mt-4 border-t pt-4 md:pl-4 text-center rounded`}
            >
              <h2 className="font-semibold text-gray-700 text-2xl">
                {t('Remaining Available Tickets')}
              </h2>
              <p
                className={`text-xl font-bold mt-2 ${
                  tickets.remainingTickets <= 0 ? 'text-red-600' : 'text-gray-900'
                }`}
              >
                {tickets.remainingTickets <= 0 ? t('Sold Out') : tickets.remainingTickets}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
