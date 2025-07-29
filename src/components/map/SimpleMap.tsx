import { Field, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import { JSX } from 'react';

interface Fields {
  mapCenterLat: Field<string>;
  mapCenterLng: Field<string>;
  mapZoom: Field<string>;
  markerPopupText: Field<string>;
  title?: Field<string>;
}

type MapComponentProps = {
  rendering: ComponentRendering & { fields: Fields };
};

export const Default = (props: MapComponentProps): JSX.Element => {
  const { fields } = props.rendering;

  const lat = parseFloat(fields?.mapCenterLat?.value || '0');
  const lng = parseFloat(fields?.mapCenterLng?.value || '0');
  const markerText = fields?.markerPopupText?.value || 'Location';

  const pinLeft = ((lng + 180) / 360) * 100;
  const pinTop = ((90 - lat) / 180) * 100;

  return (
    <div className="component-content h-64 w-full">
      <div className="map-background-organic w-full h-full relative overflow-hidden border border-[#666] rounded-lg">
        {/* Your pin and text overlay remain the same */}
        <div
          style={{
            left: `${pinLeft}%`,
            top: `${pinTop}%`,
          }}
          className="map-pin-icon absolute w-[20px] h-[20px] bg-red-600 
             border-2 border-white shadow-[0_0_5px_rgba(0,0,0,0.5)] 
             rounded-[50%_50%_50%_0] 
             transform -translate-x-1/2 -translate-y-full 
             origin-bottom-left"
          title={markerText}
        >
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div className="absolute bottom-[10px] left-[10px] text-[0.8em] text-[#333] bg-white/70 px-2 py-1 rounded">
          Approx. Lat: {lat.toFixed(4)}, Lng: {lng.toFixed(4)}
        </div>
      </div>

      {!fields?.mapCenterLat?.value && !fields?.mapCenterLng?.value ? (
        <p className="is-empty-hint text-red-500 mt-4">
          Map data not configured. This is a a simplified visual map.
        </p>
      ) : null}
    </div>
  );
};
