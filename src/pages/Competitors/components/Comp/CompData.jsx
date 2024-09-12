import React from 'react'
import { CardBlock, ContainerBlock, Spinner, TextBlock } from '../../../../components'
import { FiExternalLink } from 'react-icons/fi';



const availOptions = {
  true: "✅",
  false: "❌",
  "N/A": "N/A",

}


const CompetitorItem = ({ name, link, imageLink, availability, price, isGettingUpdateCompByArtikul, linkClasses, availabilityClasses, priceClasses, isNumericAvailability }) => (
  <CardBlock className={` 
  grid grid-cols-3 gap-2  rounded-xl  transition duration-300 ease-in-out 
  ${link ? "bg-slate-500/20 hover:bg-slate-400/20" : "grayscale"}   `}>

    <TextBlock
      onClick={() => { if (link) window.open(link) }}
      className={`group lg:text-left justify-start rounded-xl p-2 ${link ? linkClasses : "text-gray-400"} overflow-hidden hover:bg-fuchsia-500/20  `}
    >
      <span className="flex items-center " >
        {name}
        <img src={imageLink} alt={name} className=" h-4 object-cover mx-2" />

      </span>

      <span className="hidden group-hover:flex   px-2 rounded-2xl" ><FiExternalLink /> </span>
    </TextBlock>

    <TextBlock className={`text-sky-200 ${availabilityClasses}`}>
      {isGettingUpdateCompByArtikul ? <Spinner color='rgb(156 163 175)' /> : isNumericAvailability ? availability : availOptions[availability]}
    </TextBlock>

    <TextBlock className={`text-green-500 ${priceClasses}`}>
      {isGettingUpdateCompByArtikul ? <Spinner color='rgb(156 163 175)' /> : price}
    </TextBlock>

  </CardBlock>
);

export default function CompData({
  comp,
  isGettingUpdateCompByArtikul,
  isVariant
}) {






  return (
    <ContainerBlock className="grid gap-1">


      <CardBlock className="grid grid-cols-3 gap-2  rounded-xl p-2">
        <TextBlock className="font-bold">Конкурент</TextBlock>
        <TextBlock className="font-bold">Наявність</TextBlock>
        <TextBlock className="font-bold">Ціна</TextBlock>
      </CardBlock>


      {
        !isVariant &&
        <CompetitorItem
          name="BTrade"
          link={`https://sharik.ua/search/?q=${comp?.artikul}`}
          imageLink="https://sharik.ua/local/templates/main/images/ua-logo.png"
          availability={comp?.avail?.btrade}
          price={comp?.price?.btrade}
          isGettingUpdateCompByArtikul={isGettingUpdateCompByArtikul}
          linkClasses="cursor-pointer  rounded-xl p-2 "
          isNumericAvailability
        />
      }





      <CompetitorItem
        name="Yumi"
        link={comp?.competitorsLinks?.yumiLink}
        imageLink="https://images.prom.ua/2620988838_w350_h100_yumi-optovij.jpg"
        availability={comp?.avail?.yumi}
        price={comp?.price?.yumi}
        isGettingUpdateCompByArtikul={isGettingUpdateCompByArtikul}
        linkClasses="cursor-pointer rounded-xl p-2 "
        isNumericAvailability
      />


      <CompetitorItem
        name="IdeaOpt"
        link={comp?.competitorsLinks?.ideaLink}
        imageLink="https://ideaopt.com.ua/image/catalog/logo-idea.png"
        availability={comp?.avail?.idea}
        price={comp?.price?.idea}
        isGettingUpdateCompByArtikul={isGettingUpdateCompByArtikul}
        linkClasses="cursor-pointer rounded-xl p-2 "
        isNumericAvailability
      />



      <CompetitorItem
        name="Sharte"
        link={comp?.competitorsLinks?.sharteLink}
        imageLink="https://sharte.net/local/templates/dresscodeV2/images/logo_shartico2.png"
        availability={comp?.avail?.sharte}
        price={comp?.price?.sharte}
        isGettingUpdateCompByArtikul={isGettingUpdateCompByArtikul}
        linkClasses="cursor-pointer rounded-xl p-2 "
        availabilityClasses={comp?.avail?.sharte === "N/A" ? "" : "text-sky-200"}
        priceClasses={comp?.price?.sharte ? "text-green-500" : ""}
      />


      <CompetitorItem
        name="Air"
        link={comp?.competitorsLinks?.airLink}
        imageLink="https://airballoons.com.ua/image/catalog/logo_IVVO11.png"
        availability={comp?.avail?.air}
        price={comp?.price?.air}
        isGettingUpdateCompByArtikul={isGettingUpdateCompByArtikul}
        linkClasses="cursor-pointer rounded-xl p-2 "
        availabilityClasses={comp?.avail?.air === "N/A" ? "" : "text-sky-200"}
        priceClasses={comp?.price?.air ? "text-green-500" : ""}
      />


      <CompetitorItem
        name="Best"
        link={comp?.competitorsLinks?.bestLink}
        imageLink="https://best-balloons.com.ua/wp-content/uploads/2019/05/wood-logo-dark.jpg"
        availability={comp?.avail?.best}
        price={comp?.price?.best}
        isGettingUpdateCompByArtikul={isGettingUpdateCompByArtikul}
        linkClasses="cursor-pointer rounded-xl p-2 "
        availabilityClasses={comp?.avail?.best === "N/A" ? "" : "text-sky-200"}
        priceClasses={comp?.price?.best ? "text-green-500" : ""}
      />


      <CompetitorItem
        name="Aero"
        link={comp?.competitorsLinks?.aeroLink}
        imageLink="https://images.prom.ua/4361922127_w350_h100_aero-bum.jpg"
        availability={comp?.avail?.aero}
        price={comp?.price?.aero}
        isGettingUpdateCompByArtikul={isGettingUpdateCompByArtikul}
        linkClasses="cursor-pointer rounded-xl p-2"
        availabilityClasses={comp?.avail?.aero === "N/A" ? "" : "text-sky-200"}
        priceClasses={comp?.price?.aero ? "text-green-500" : ""}
      />

      <CompetitorItem
        name="Balun"
        link={comp?.competitorsLinks?.balunLink}
        imageLink="https://images.prom.ua/2069861087_w250_h120_balun-optovij.jpg"
        availability={comp?.avail?.balun}
        price={comp?.price?.balun}
        isGettingUpdateCompByArtikul={isGettingUpdateCompByArtikul}
        linkClasses="cursor-pointer rounded-xl p-2 "
        availabilityClasses={comp?.avail?.balun === "N/A" ? "" : "text-sky-200"}
        priceClasses={comp?.price?.balun ? "text-green-500" : ""}
      />


      <CompetitorItem
        name="Svyato"
        link={comp?.competitorsLinks?.svyatoLink}
        imageLink="https://svyatoopt.com.ua/content/images/2/200x100l90nn0/52579472314969.webp"
        availability={comp?.avail?.svyato}
        price={comp?.price?.svyato}
        isGettingUpdateCompByArtikul={isGettingUpdateCompByArtikul}
        linkClasses="cursor-pointer rounded-xl p-2 "
        availabilityClasses={comp?.avail?.svyato === "N/A" ? "" : "text-sky-200"}
        priceClasses={comp?.price?.svyato ? "text-green-500" : ""}
      />





    </ContainerBlock>
  )
}
