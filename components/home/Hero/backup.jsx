// import { useState } from 'react'
// import { Box, Flex, Text } from 'components/primitives'
// import CardFrame from './HeroCardImage'
// import Arrow from 'components/primitives/Arrow'

// const HeroHome = () => {
//   const [activeCard, setActiveCard] = useState(0)

//   const handleBarClick = (index: number) => {
//     setActiveCard(index)
//   }

//   return (
//     <Box
//       css={{
//         width: '100%',
//         background: 'linear-gradient(0deg, #362a67 30%, #000000 100%)',
//         overflow: 'hidden',
//         display: 'flex',
//         flexDirection: 'row', // Changed to column to keep elements within the div
//         alignItems: 'center', // Adjusted alignment for column layout
//         justifyContent: 'space-between',
//         marginTop: '80px',
//         padding: '5vw 0px 8vh 12vw',
//         gap: '60px',
//         textAlign: 'left',
//         fontSize: '48px',
//         fontFamily: 'Nohemi',
//         '@bp1': {
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//           marginTop: '80px',
//           padding: '10vh 2vw',
//           gap: '30px',
//         },
//       }}
//     >
//       <Flex
//         css={{
//           flexDirection: 'column',
//           gap: '24px',
//           '@bp1': {
//             width: '100%',
//           },
//         }}
//       >
//         <Text
//           style="h1"
//           as="h1"
//           css={{
//             margin: 0,
//             alignSelf: 'stretch',
//             position: 'relative',
//             background: 'linear-gradient(0deg, #EBEBFC 0%, #A2A3AE 100%)',
//             WebkitBackgroundClip: 'text',
//             WebkitTextFillColor: 'transparent',
//             textShadow: '0px 10px 5px rgba(0, 0, 0, 0.1)',
//             '@bp2': {
//               fontSize: '38px',
//               lineHeight: '46px',
//             },
//             '@bp3': {
//               fontSize: '29px',
//               lineHeight: '35px',
//             },
//             '@bp1': {
//               width: '100%',
//             },
//           }}
//         >
//           Discover our <br /> warehouse
//           <br />
//           of vaulted Art
//         </Text>
//         <Text
//           style="body"
//           as="p"
//           css={{
//             position: 'relative',
//             fontSize: '15px',
//             textTransform: 'capitalize',
//             lineHeight: '36px',
//             background: 'linear-gradient(0deg, #ebebfc, #a2a3ae)',
//             WebkitBackgroundClip: 'text',
//             WebkitTextFillColor: 'transparent',
//             textShadow: '0px 10px 10px rgba(0, 0, 0, 0.0)',
//             paddingRight: '20px',
//             paddingBottom: '60px',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '24px',
//             '@bp1': {
//               width: '100%',
//             },
//           }}
//         >
//           Welcome to the official first multichain
//           <br />
//           market vaulted for the people.
//         </Text>
//         <Arrow text="Discover Vaults" href="/discover-vaults" />
//         <Arrow text="Explore Apps" href="/explore-apps" />
//       </Flex>
//       <CardFrame
//         activeCard={activeCard}
//         css={{
//           marginRight: '0',
//           alignSelf: 'flex-end',
//           '@bp1': {
//             width: '100%',
//             alignSelf: 'center',
//           },
//         }}
//       />
//       {/* TO DO: Need to add paganation scrolle back  */}
//       {/* <Box
//         css={{
//           display: 'flex',
//           position: 'relative', // Changed from absolute to relative to keep within the parent div
//           bottom: 'initial', // Removed specific positioning to allow natural flow within the div
//           left: 'initial',
//           transform: 'none', // Removed translation to maintain natural document flow
//           width: '100%',
//           maxWidth: '232px',
//           justifyContent: 'center',
//           alignSelf: 'center', // Centered within the parent div
//           marginTop: '20px', // Added margin top for spacing from the previous element
//         }}
//       >
//         {Array.from({ length: 6 }, (_, index) => (
//           <Box
//             key={index}
//             onClick={() => handleBarClick(index)}
//             css={{
//               height: '5px',
//               backgroundColor: 'rgba(255, 255, 255, 0.2)',
//               flex: '1',
//               margin: '0 5px',
//               position: 'relative',
//               '&:last-child': { marginRight: 0 },
//               '&:first-child': { marginLeft: 0 },
//             }}
//           >
//             {activeCard === index && (
//               <Box
//                 css={{
//                   height: '5px',
//                   backgroundColor: '#EBEBFC',
//                   position: 'absolute',
//                   bottom: 0,
//                   left: 0,
//                   transition: 'width 300ms ease-in-out',
//                   width: '100%',
//                 }}
//               />
//             )}
//           </Box>
//         ))}
//       </Box> */}
//     </Box>
//   )
// }

// export default HeroHome
