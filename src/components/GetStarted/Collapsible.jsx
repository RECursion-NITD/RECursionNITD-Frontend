/* eslint-disable */
import React from 'react';
import { motion } from "framer-motion";
import useContent from '../../hooks/useContent';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

const Collapsible = ({ idx, item }) => {

    const {levelSelected, setTopicSelected, topicSelected, subtopicSelected, setSubTopicSelected} = useContent();

    function handler(id){
        setSubTopicSelected(id);
        console.log(id);
    }

    const variants = {
        closed: { height: '0px',overflow:'hidden' },
        open: { height: 'fit-content' },
    }

  return (
    <motion.div  className='pt-3 w-full' 
    style={{
    display:(idx==levelSelected)? 'block':'none',
    }}
    animate={(idx==levelSelected) ? "open" : "closed"}
    variants={variants}
    >
    {
    item.topic.map((topic,topicIdx)=>{
         return(
            <div>
                <div className='flex justify-between'>
                    <div key={topicIdx} onClick={(e)=>{setTopicSelected(topicIdx)}} className='font-head font-semibold mx-0 text-md pb-4 pl-6 cursor-pointer' 
                    style={{
                        color:(topicIdx==topicSelected && levelSelected==idx)? '#149ECA':'#ffffff',
                    }}>
                        {topic.Topic_title}
                    </div>
                    {(idx==levelSelected && topicSelected==topicIdx)? <ChevronUpIcon className='ml-0 mr-3'/>:<ChevronDownIcon className='ml-0 mr-3'/>}
                </div>
                <motion.div style={{
                    display:(levelSelected==idx && topicSelected==topicIdx)? 'block':'none',
                }}
                animate={(levelSelected==idx && topicSelected==topicIdx) ? "open" : "closed"}
                variants={variants}
                >
                    {
                        topic.subtopic?.map((sub,subtopicIdx)=>{
                            return(
                                <div key={subtopicIdx} onClick={(e)=>handler(sub.id)} className='font-head font-semibold text-sm pb-4 pl-12 cursor-pointer' 
                                style={{
                                    color:(sub.id==subtopicSelected)? '#149ECA':'#ffffff',
                                }}>
                                    {sub.sub_topic}
                                </div>
                            )
                        })
                    }
                </motion.div>
            </div>
            )
            })
        }
    </motion.div>
  )
}

export default Collapsible  