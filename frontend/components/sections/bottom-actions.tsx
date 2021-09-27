import ButtonLink from '../elements/button-link';
import { getButtonAppearance } from '../../src/utils/button';

interface typesBottomActions {
  data: {
    title: string;
    buttons: string[];
  };
}

const BottomActions: React.FC<typesBottomActions> = ({ data }) => {
  return (
    <section className="py-20 text-center bg-primary-800">
      <h2 className="mb-10 text-white title">{data.title}</h2>
      {/* Buttons row */}
      <div className="container flex flex-row flex-wrap justify-center gap-4">
        {data.buttons.map((button: any) => (
          <ButtonLink
            button={button}
            appearance={getButtonAppearance(button.type, 'dark')}
            key={button.id}
          />
        ))}
      </div>
    </section>
  );
};

export default BottomActions;
