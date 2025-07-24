import { JSX, useEffect, useState } from 'react';
import {
  Link as JssLink,
  Link,
  LinkField,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { getButtonSiteSettings, SiteSettingsResponse } from 'lib/graphql/services';
import { FaDownload, FaCheckCircle } from 'react-icons/fa';

interface DropLinkField {
  fields: {
    name: {
      value: string;
    };
  };
}

interface Fields {
  buttonType: DropLinkField;
  backgroundColor: DropLinkField;
  buttonLink: LinkField;
  buttonShape: DropLinkField;
  icon: DropLinkField;
  labelCase: DropLinkField;
  labelColor: DropLinkField;
}

type ButtonProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const ButtonDefaultComponent = (props: ButtonProps): JSX.Element => (
  <div className={`component button ${props?.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Button</span>
    </div>
  </div>
);

export const Default = (props: ButtonProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const [siteSettings, setSiteSettings] = useState<SiteSettingsResponse | null>(null);
  const { sitecoreContext } = useSitecoreContext();
  const { fields } = props;

  useEffect(() => {
    async function fetchSettings() {
      const settings = await getButtonSiteSettings();
      setSiteSettings(settings);
    }

    fetchSettings();
  }, []);

  const siteBtnBgColor = siteSettings?.item.backgroundColor.jsonValue.fields.name.value || '';
  const siteBtnLabelColor = siteSettings?.item.labelColor.jsonValue.fields.name.value || '';

  const buttonShape = sitecoreContext?.route?.fields?.buttonShape as unknown as DropLinkField;
  const labelColor = sitecoreContext?.route?.fields?.labelColor as unknown as DropLinkField;

  const pageBtnShape = buttonShape?.fields?.name?.value || '';
  const pageBtnLabelColor = labelColor?.fields?.name?.value || '';

  const btnType = fields?.buttonType?.fields?.name?.value;
  let btnBgColor = siteBtnBgColor;
  let btnLabelColor = '';
  let btnShape = '';

  switch (btnType) {
    case 'Site Level':
      btnLabelColor = siteBtnLabelColor;
      break;
    case 'Page Level':
      btnLabelColor = pageBtnLabelColor ? pageBtnLabelColor : siteBtnLabelColor;
      btnShape = pageBtnShape;
      break;
    default:
      btnBgColor = fields?.backgroundColor
        ? fields?.backgroundColor?.fields?.name?.value
        : siteBtnBgColor;
      btnLabelColor = fields?.labelColor
        ? fields?.labelColor?.fields?.name?.value
        : pageBtnLabelColor;
      btnShape = fields?.buttonShape ? fields?.buttonShape?.fields?.name?.value : pageBtnShape;
      break;
  }

  const btnHoverColor =
    btnBgColor === 'bg-white'
      ? 'hover:bg-red-400 hover:text-white'
      : 'hover:bg-indigo-800 hover:text-white';
  const btnBorderColor = btnBgColor === 'bg-white' ? 'border-red-400' : 'border-indigo-400';

  const btnCase = fields?.labelCase?.fields?.name?.value;
  const btnIcon = fields?.icon?.fields?.name?.value;

  const btnClasses = `${btnBgColor} ${btnHoverColor} ${btnLabelColor} ${btnShape} ${btnCase} ${btnBorderColor}`;

  if (props.fields) {
    return (
      <>
        {sitecoreContext.editMode ? (
          <JssLink field={props.fields.buttonLink} />
        ) : (
          <Link
            className={`inline-flex ms-6 mt-6 items-center component button ${props?.params?.styles}`}
            id={id ? id : undefined}
            field={props.fields.buttonLink}
          >
            <div
              className={`button-wrapper flex items-center justify-center gap-2 border font-sans px-8 py-2 h-12 font-semibold min-w-44  ${btnClasses}`}
            >
              {btnIcon === 'Download' && <FaDownload />}
              {btnIcon === 'Check' && <FaCheckCircle />}
              {fields?.buttonLink?.value?.text}
            </div>
          </Link>
        )}
      </>
    );
  }

  return <ButtonDefaultComponent {...props} />;
};
