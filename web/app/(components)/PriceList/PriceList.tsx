import './PriceList.css';

type PriceListItemProps = {
  title: string;
  description?: string;
  price: string;
};

const PriceListItem = ({ title, description, price }: PriceListItemProps) => {
  return (
    <li className="price-list__item">
      <div className="title">{title}</div>
      {description && <div className="description">{description}</div>}
      <div className="price">{price}</div>
    </li>
  );
};

export const PriceList = () => {
  return (
    <section className="price-list">
      <div className="content">
        <h2 id="cennik">Cenník</h2>
        <p>
          V tejto sekcii nájdete prehľad balíčkov a cien, ktoré ponúkame.
          Informujte sa o zahrnutých službách, počte fotografií a ďalších
          podrobnostiach týkajúcich sa mojich ponúk.
        </p>
        <div className="price-list__items">
          <PriceListItem
            title="Malý balíček"
            description="5 upravených fotiek"
            price="20 €"
          />
          <PriceListItem
            title="Veľký balíček"
            description="10 upravených fotiek"
            price="30 €"
          />
          <PriceListItem title="Každá ďalšia fotka" price="20 €" />
        </div>
      </div>
    </section>
  );
};
