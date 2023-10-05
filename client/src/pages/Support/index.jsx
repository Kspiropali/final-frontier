import React, { useEffect, useState } from 'react'

import '../../assets/css/support.css'
import { ServicesModal, SupportCarousel, SupportServicesList } from '../../components'
import callOMG from "../../assets/images/supportIcons/callOMG.svg"
import mindfullnessOMG from "../../assets/images/supportIcons/mindfullnessOMG.svg"
import emotionalSupportOMG from "../../assets/images/supportIcons/emotionalSupportOMG.svg"
import exerciseOMG from "../../assets/images/supportIcons/exerciseOMG.svg"
import chillingOMG from "../../assets/images/supportIcons/chillingOMG.svg"

const Support = () => {
  
  const supportServiceSchema = [
    {
    id: 0,
    type_name: "Talking",
    type_id: 1,
    icon_url: callOMG,
    service_list: [{title: "Samaritans", description: "A UK charity with a 24/7 support line aimed at providing emotional support to anyone in emotional distress." ,url: "https://www.samaritans.org/how-we-can-help/contact-samaritan/"},
    {title: "Local NHS Helpline Finder", description: "A tool for accessing 24-hour advice and support for you, your child, your parent, or someone you care for." ,url: "https://www.nhs.uk/service-search/mental-health/find-an-urgent-mental-health-helpline"},{title: "Breathing Space", description: "Call or use Webchat to communicate with specialist advisors in confidence." ,url: "https://breathingspace.scot/how-we-can-help/need-to-talk/"}, 
    {title: "Centre for Mental Health", description: "A support services search tool for UK-based services" ,url: "https://www.centreformentalhealth.org.uk/helplines-and-crisis-contacts"},
    {title: "Better Connected (By Guideposts)", description: "Better Connected is a UK-wide social club for anyone with autism or learning difficulties." ,url: "https://guideposts.org.uk/services/better-connected/"},
    {title: "Breathing Space", description: "Call or use Webchat to communicate with specialist advisors in confidence." ,url: "https://breathingspace.scot/how-we-can-help/need-to-talk/"}, 
    {title: "Centre for Mental Health", description: "A support support services search tool for UK-based services" ,url: "https://www.centreformentalhealth.org.uk/helplines-and-crisis-contacts"}]
    },
    {
    id: 1,
    type_name: "Stress Management",
    type_id: 2,
    icon_url: mindfullnessOMG,
    service_list: [{title: "International Stress Management Association", description: "ISMA provide information and workshops about all aspects of stress management." ,url: "https://www.google.com/search?q=stress+management"}, {title: "Stress Management Society", description: "Information, advice on stress management and workshops to help get you started on your journey." ,url: "https://www.stress.org.uk/"}, {title: "National Sleep Helpline", description: "advice to deal with most sleep issues, and ensure everyone understands the value of a good night's sleep." ,url: "https://thesleepcharity.org.uk/national-sleep-helpline/"}, {title: "Sleepstation", description: "Backed by science, their online sleep service is proven to combat the most severe insomnia." ,url: "https://www.sleepstation.org.uk/"}, {title: "Student Minds", description: "Advice on how to manage your exam stress" ,url: "https://www.studentminds.org.uk/examstress.html"}]
    },
    {
    id: 2,
    type_name: "Physical Wellness",
    type_id: 3,
    icon_url: exerciseOMG,
    service_list: [{title: "Sport In Mind", description: "A mental health sports charity that deliver physical activity to aid with an promote mental wellbeing." ,url: "https://www.google.com/search?q=stress+management"}, {title: "MenWalkTalk", description: "A network of social groups across South East England aimed at realising the benefits of enjoying the outdoors." ,url: "https://menwalktalk.co.uk/"}, {title: "Parkrun", description: "A network of local running groups across the UK that aim to bring socialising and fun to your run." ,url: "https://www.google.com/search?q=stress+management"}, {title: "Cycling UK", description: "Find your local cycling group." ,url: "https://www.cyclinguk.org/groups-listing"},{title: "CrossFit Gym Finder", description: "Find all the registered CrossFit gyms in any location around the world" ,url: "https://www.crossfit.com/map"}]
    },
    {
    id: 3,
    type_name: "Emotional Support",
    type_id: 4,
    icon_url: chillingOMG,
    service_list: [{title: "Befriending Networks", description: "Get matched with a befriender and gain a reliable social contact and trusting relationship" ,url: "https://www.befriending.co.uk/"}, {title: "Aquila", description: "Auila offers help and hope to those suffering pain from broken relationships through its self-help courses" ,url: "www.hope-after-heartbreak.co.uk"},{title: "Kindship", description: "Support for the amazing individuals who step up to raise children when their parents can't." ,url: "https://www.befriending.co.uk/"}, {title: "Local NHS Helpline Finder", description: "A tool for accessing 24-hour advice and support for you, your child, your parent, or someone you care for." ,url: "https://www.nhs.uk/service-search/mental-health/find-an-urgent-mental-health-helpline"}]
    }
]

  const [supportServices, setSupportServices] = useState(supportServiceSchema)
  const [serviceChoice, setServiceChoice] = useState({})
  const [isOpen, setIsOpen] = useState(false)

  function findService(moodNum){
    //returns an array object (must be accessed via index [0])
    return supportServiceSchema.filter((service) => service.type_id == moodNum)
  }

  function currentSelection(e){
    const choiceId = e.target.id

    const service = supportServices.filter((supportService) => choiceId.includes(supportService.type_id.toString()))

    setServiceChoice(service)
  }

  return (
    <div className='support-ova'>
    <h1 className='top-header' >Support</h1>
    <div className='carousel-comp-container'>
      <SupportCarousel currentSelection={currentSelection} supportServiceSchema={supportServiceSchema} supportServices={supportServices} setIsOpen={setIsOpen} isOpen={isOpen} />
    </div>
    <ServicesModal open={isOpen} setIsOpen={setIsOpen}>
      <SupportServicesList supportServices={supportServices} serviceChoice={serviceChoice} />
    </ServicesModal>
    {/* {serviceChoice[0] ? <SupportServicesList supportServices={supportServices} serviceChoice={serviceChoice} /> : ""} */}
    
    </div>
  )
}

export default Support
