import AccessibleIcon from '@site/static/img/icons/accessible.svg'
import ArrowDownIcon from '@site/static/img/icons/arrow-down.svg'
import ArrowLeftIcon from '@site/static/img/icons/arrow-left.svg'
import ArrowRightIcon from '@site/static/img/icons/arrow-right.svg'
import BankIcon from '@site/static/img/icons/bank.svg'
import IconBrave from '@site/static/img/icons/brave.svg'
import CalendarIcon from '@site/static/img/icons/calendar.svg'
import CardIcon from '@site/static/img/icons/card.svg'
import ChatIcon from '@site/static/img/icons/chat.svg'
import CheckIcon from '@site/static/img/icons/check.svg'
import CheckCircleIcon from '@site/static/img/icons/check-circle.svg'
import ChevronIcon from '@site/static/img/icons/chevron.svg'
import IconChrome from '@site/static/img/icons/chrome.svg'
import ClockIcon from '@site/static/img/icons/clock.svg'
import CloseIcon from '@site/static/img/icons/close.svg'
import CommunityIcon from '@site/static/img/icons/community.svg'
import CompassIcon from '@site/static/img/icons/compass.svg'
import ControlsIcon from '@site/static/img/icons/controls.svg'
import CopyIcon from '@site/static/img/icons/copy.svg'
import CrossIcon from '@site/static/img/icons/cross.svg'
import DarkModeIcon from '@site/static/img/icons/dark-mode.svg'
import IconDiscord from '@site/static/img/icons/discord.svg'
import DocumentIcon from '@site/static/img/icons/document.svg'
import DownloadIcon from '@site/static/img/icons/download.svg'
import DropdownIcon from '@site/static/img/icons/dropdown.svg'
import IconEdge from '@site/static/img/icons/edge.svg'
import ExternalArrowIcon from '@site/static/img/icons/external-arrow.svg'
import IconFirefox from '@site/static/img/icons/firefox.svg'
import GasIcon from '@site/static/img/icons/gas.svg'
import IconGitHub from '@site/static/img/icons/github.svg'
import GlobeIcon from '@site/static/img/icons/globe.svg'
import HomeIcon from '@site/static/img/icons/home.svg'
import InfoIcon from '@site/static/img/icons/info.svg'
import IconInstagram from '@site/static/img/icons/instagram.svg'
import LightModeIcon from '@site/static/img/icons/light-mode.svg'
import IconLinkedIn from '@site/static/img/icons/linkedin.svg'
import LocationIcon from '@site/static/img/icons/location.svg'
import LockIcon from '@site/static/img/icons/lock.svg'
import LowCostIcon from '@site/static/img/icons/low-cost.svg'
import MaskIcon from '@site/static/img/icons/mask.svg'
import MessageIcon from '@site/static/img/icons/message.svg'
import MinusIcon from '@site/static/img/icons/minus.svg'
import IconOpera from '@site/static/img/icons/opera.svg'
import PlayIcon from '@site/static/img/icons/play.svg'
import PlusIcon from '@site/static/img/icons/plus.svg'
import IconReddit from '@site/static/img/icons/reddit.svg'
import RefreshIcon from '@site/static/img/icons/refresh.svg'
import SearchIcon from '@site/static/img/icons/search.svg'
import ShareIcon from '@site/static/img/icons/share.svg'
import ShieldIcon from '@site/static/img/icons/shield.svg'
import StarIcon from '@site/static/img/icons/star.svg'
import IconTelegram from '@site/static/img/icons/telegram.svg'
import IconTiktok from '@site/static/img/icons/tiktok.svg'
import TranscriptIcon from '@site/static/img/icons/transcript.svg'
import UserIcon from '@site/static/img/icons/user.svg'
import WalletIcon from '@site/static/img/icons/wallet.svg'
import IconWarpcast from '@site/static/img/icons/warpcast.svg'
import IconX from '@site/static/img/icons/x.svg'
import IconYouTube from '@site/static/img/icons/youtube.svg'

export const buttonIconMap = {
  ['accessible']: { component: AccessibleIcon },
  ['arrow-down']: { component: ArrowDownIcon, direction: 'down' },
  ['arrow-left']: { component: ArrowLeftIcon, direction: 'left' },
  ['arrow-right']: { component: ArrowRightIcon, direction: 'right' },
  ['bank']: { component: BankIcon },
  ['calendar']: { component: CalendarIcon },
  ['card']: { component: CardIcon },
  ['chat']: { component: ChatIcon },
  ['check']: { component: CheckIcon },
  ['check-circle']: { component: CheckCircleIcon },
  ['chevron']: { component: ChevronIcon, direction: 'right' },
  ['clock']: { component: ClockIcon },
  ['close']: { component: CloseIcon },
  ['community']: { component: CommunityIcon },
  ['compass']: { component: CompassIcon },
  ['controls']: { component: ControlsIcon },
  ['copy']: { component: CopyIcon },
  ['cross']: { component: CrossIcon },
  ['dark-mode']: { component: DarkModeIcon },
  ['document']: { component: DocumentIcon },
  ['download']: { component: DownloadIcon, direction: 'down' },
  ['dropdown']: { component: DropdownIcon, direction: 'down' },
  ['external-arrow']: { component: ExternalArrowIcon, direction: 'oblique' },
  ['gas']: { component: GasIcon },
  ['github']: { component: IconGitHub },
  ['globe']: { component: GlobeIcon },
  ['home']: { component: HomeIcon },
  ['info']: { component: InfoIcon },
  ['light-mode']: { component: LightModeIcon },
  ['location']: { component: LocationIcon, direction: 'down' },
  ['lock']: { component: LockIcon },
  ['low-cost']: { component: LowCostIcon },
  ['mask']: { component: MaskIcon },
  ['message']: { component: MessageIcon },
  ['minus']: { component: MinusIcon },
  ['play']: { component: PlayIcon, direction: 'right' },
  ['plus']: { component: PlusIcon },
  ['refresh']: { component: RefreshIcon },
  ['search']: { component: SearchIcon },
  ['share']: { component: ShareIcon },
  ['shield']: { component: ShieldIcon },
  ['star']: { component: StarIcon },
  ['transcript']: { component: TranscriptIcon },
  ['user']: { component: UserIcon },
  ['wallet']: { component: WalletIcon },
}

export const socialIconMap = {
  ['x']: IconX,
  ['twitter']: IconX,
  ['github']: IconGitHub,
  ['warpcast']: IconWarpcast,
  ['youtube']: IconYouTube,
  ['instagram']: IconInstagram,
  ['discord']: IconDiscord,
  ['reddit']: IconReddit,
  ['telegram']: IconTelegram,
  ['tiktok']: IconTiktok,
  ['linkedin']: IconLinkedIn,
}

export const browserIconMap = {
  ['chrome']: IconChrome,
  ['firefox']: IconFirefox,
  ['brave']: IconBrave,
  ['edge']: IconEdge,
  ['opera']: IconOpera,
}
