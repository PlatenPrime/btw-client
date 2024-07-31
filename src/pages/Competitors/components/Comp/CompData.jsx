import React from 'react'
import { CardBlock, ContainerBlock, Spinner, TextBlock } from '../../../../components'


const CompetitorItem = ({ name, link, availability, price, isGettingUpdateCompByArtikul, linkClasses, availabilityClasses, priceClasses, isNumericAvailability }) => (
  <CardBlock className="grid grid-cols-3 gap-2 bg-gradient-to-b from-slate-600/50 to-slate-900/50 rounded-xl">
    <TextBlock
      onClick={() => { if (link) window.open(link) }}
      className={`group  rounded-xl p-2 ${link ? linkClasses : "text-gray-400"} overflow-hidden  `}
    >
      <span className="hidden group-hover:flex justify-center w-full" >{link?.slice(0, 20)}...</span> <span className="flex group-hover:hidden" >{name}</span>  
    </TextBlock>
    <TextBlock className={`text-sky-200 ${availabilityClasses}`}>
      {isGettingUpdateCompByArtikul ? <Spinner color='rgb(156 163 175)' /> : isNumericAvailability ? availability : (availability === "N/A" ? "N/A" : availability ? '✅' : '❌')}
    </TextBlock>
    <TextBlock className={`text-green-500 ${priceClasses}`}>
      {isGettingUpdateCompByArtikul ? <Spinner color='rgb(156 163 175)' /> : price}
    </TextBlock>
  </CardBlock>
);

export default function CompData({ comp, isGettingUpdateCompByArtikul }) {





  
  return (
    <ContainerBlock className="grid gap-2">
  

      <CardBlock className="grid grid-cols-3 gap-2 bg-gradient-to-b from-slate-700/50 to-slate-900/50 rounded-xl p-2">
        <TextBlock className="font-bold">Конкурент</TextBlock>
        <TextBlock className="font-bold">Наявність</TextBlock>
        <TextBlock className="font-bold">Ціна</TextBlock>
      </CardBlock>

      <CompetitorItem
        name="BTrade"
        link={`https://sharik.ua/search/?q=${comp?.artikul}`}
        availability={comp?.avail?.btrade}
        price={comp?.price?.btrade}
        isGettingUpdateCompByArtikul={isGettingUpdateCompByArtikul}
        linkClasses="cursor-pointer hover:bg-sky-500 rounded-xl p-2 bg-gradient-to-b from-sky-500/50 to-sky-900/50"
        isNumericAvailability
      />
      <CompetitorItem
        name="Yumi"
        link={comp?.competitorsLinks?.yumiLink}
        availability={comp?.avail?.yumi}
        price={comp?.price?.yumi}
        isGettingUpdateCompByArtikul={isGettingUpdateCompByArtikul}
        linkClasses="cursor-pointer rounded-xl p-2 bg-gradient-to-b from-amber-500/50 to-amber-900/50 hover:bg-amber-500"
        isNumericAvailability
      />
      <CompetitorItem
        name="Sharte"
        link={comp?.competitorsLinks?.sharteLink}
        availability={comp?.avail?.sharte}
        price={comp?.price?.sharte}
        isGettingUpdateCompByArtikul={isGettingUpdateCompByArtikul}
        linkClasses="cursor-pointer rounded-xl p-2 bg-gradient-to-b from-blue-500/50 to-blue-900/50 hover:bg-blue-500"
        availabilityClasses={comp?.avail?.sharte === "N/A" ? "" : "text-sky-200"}
        priceClasses={comp?.price?.sharte ? "text-green-500" : ""}
      />
      <CompetitorItem
        name="Air"
        link={comp?.competitorsLinks?.airLink}
        availability={comp?.avail?.air}
        price={comp?.price?.air}
        isGettingUpdateCompByArtikul={isGettingUpdateCompByArtikul}
        linkClasses="cursor-pointer rounded-xl p-2 bg-gradient-to-b from-green-500/50 to-green-900/50 hover:bg-green-500"
        availabilityClasses={comp?.avail?.air === "N/A" ? "" : "text-sky-200"}
        priceClasses={comp?.price?.air ? "text-green-500" : ""}
      />
      <CompetitorItem
        name="Best"
        link={comp?.competitorsLinks?.bestLink}
        availability={comp?.avail?.best}
        price={comp?.price?.best}
        isGettingUpdateCompByArtikul={isGettingUpdateCompByArtikul}
        linkClasses="cursor-pointer rounded-xl p-2 bg-gradient-to-b from-pink-500/50 to-pink-900/50 hover:bg-pink-500"
        availabilityClasses={comp?.avail?.best === "N/A" ? "" : "text-sky-200"}
        priceClasses={comp?.price?.best ? "text-green-500" : ""}
      />
    </ContainerBlock>
  )
}
