export const defaultData = {
  phases: [
    {
      id: 'before',
      label: 'Inquiry',
      directions: [
        {
          id: 'accept',
          label: 'Accept',
          buttons: [
            {
              id: 'b_accept_greet',
              label: 'Accept & Review',
              type: 'static',
              text:     'Thank you for your inquiry.\nI will review the details and get back to you shortly.\nI appreciate your patience in the meantime.',
              textWarm: "Thanks so much for reaching out! I'll take a look at the details and get back to you soon.\nCan't wait to check it out!"
            },
            {
              id: 'b_confirm_budget',
              label: 'Check Budget',
              type: 'static',
              text:     'Could you please let me know your estimated budget for this project?',
              textWarm: "What's your budget for this? Let me know so I can send over a proper quote!"
            },
            {
              id: 'b_confirm_deadline',
              label: 'Check Deadline',
              type: 'static',
              text:     'Could you please share your preferred deadline for this project?',
              textWarm: 'When would you need this completed by?'
            },
            {
              id: 'b_required_template',
              label: 'Order Form',
              type: 'static',
              text:     'To proceed with your request, could you please fill out the details below?\n\n・Project Details: \n・Budget: \n・Preferred Deadline: \n・Commercial Use: [Yes / No]\n・Platform / Usage Scope: \n・Other Requests: ',
              textWarm: 'To get things started, could you fill in the template below?\n\n・Project Details: \n・Budget: \n・Preferred Deadline: \n *Commercial Use: [Yes / No]\n・Platform / Usage Scope: \n・Other Requests: '
            },
            {
              id: 'b_estimate',
              label: 'Send Estimate',
              type: 'static',
              text:     'Please find the estimate for your project below.\n\n【Estimate】\nItem: \nUnit Price: \nQuantity: \nTotal: \n\nPayment Due: \nPayment Method: \n\nPlease review the details, and feel free to reach out if you have any questions.',
              textWarm: "Here's the estimate for your project!\n\n【Estimate】\nItem: \nUnit Price: \nQuantity: \nTotal: \n\nPayment Due: \nPayment Method: \n\nTake a look and let me know if everything looks good!"
            },
            {
              id: 'b_payment_info',
              label: 'Payment Info',
              type: 'input',
              text: ''
            }
          ]
        },
        {
          id: 'decline',
          label: 'Decline',
          buttons: [
            {
              id: 'b_decline_budget',
              label: 'No: Budget',
              type: 'static',
              text:     'Thank you for considering me for your project. Unfortunately, the proposed budget is below my minimum rate for this type of work, so I must respectfully decline.',
              textWarm: "Thank you so much for thinking of me! I'm sorry, but I'm unable to take this on at the proposed budget. Hope we can work together in the future!"
            },
            {
              id: 'b_decline_deadline',
              label: 'No: Deadline',
              type: 'static',
              text:     'Thank you for your inquiry. Unfortunately, I am unable to meet the requested deadline due to my current schedule.',
              textWarm: "Thanks for reaching out! I'm sorry, but I won't be able to make that deadline with my current workload."
            },
            {
              id: 'b_decline_schedule',
              label: 'No: Schedule',
              type: 'static',
              text:     'Thank you for your interest in my work. Unfortunately, my queue is currently full and I am not accepting new commissions at this time.',
              textWarm: "Thank you so much for thinking of me! I'm sorry, but my schedule is totally packed right now so I have to pass this time."
            },
            {
              id: 'b_decline_other',
              label: 'No: Other',
              type: 'input',
              text: ''
            }
          ]
        }
      ]
    },
    {
      id: 'during',
      label: 'In Progress',
      directions: [
        {
          id: 'progress',
          label: 'Production',
          buttons: [
            {
              id: 'b_production_start_paid',
              label: 'Start (Paid)',
              type: 'static',
              text:     'Thank you — I have confirmed your payment.\nI will now begin working on your project and will update you as soon as the rough sketch is ready.',
              textWarm: "Payment confirmed — thank you! I'm super excited to get started.\nI'll send over the rough sketch as soon as it's ready!"
            },
            {
              id: 'b_production_start_nopay',
              label: 'Start Work',
              type: 'static',
              text:     'I will now begin working on your project.\nI will update you as soon as the rough sketch is complete.',
              textWarm: "Getting started on your project now!\nI'll ping you once the rough sketch is ready."
            },
            {
              id: 'b_rough_check',
              label: 'Send Rough',
              type: 'static',
              text:     'The rough sketch is ready for your review.\nPlease see the attached file and let me know if you would like any revisions.',
              textWarm: "Here's the rough sketch! Could you take a look and let me know what you think?\nFeel free to ask for changes!"
            },
            {
              id: 'b_rough_revision_reply',
              label: 'Revision Note',
              type: 'static',
              text:     'Thank you for the feedback.\nI will update the sketch based on your notes and send you the revised version shortly.',
              textWarm: "Thanks for the notes!\nI'll get those changes sorted and show you the update soon!"
            },
            {
              id: 'b_rough_no_revision',
              label: 'To Final Stage',
              type: 'static',
              text:     'Thank you for your approval. I will now proceed with the final artwork.',
              textWarm: "Awesome, glad you like it! Moving on to the final version now!"
            }
          ]
        }
      ]
    },
    {
      id: 'done',
      label: 'Completed',
      directions: [
        {
          id: 'deliver',
          label: 'Delivery',
          buttons: [
            {
              id: 'b_check_draft',
              label: 'Final Review',
              type: 'static',
              text:     "The final artwork is now complete. Please review the attached file.\nIf any minor adjustments are needed, please let me know. Once approved, I will deliver the final files.",
              textWarm: "It's all done! Could you take a final look?\nIf there are any major changes needed, just let me know. Otherwise, I'll go ahead and send it over!"
            },
            {
              id: 'b_delivery_complete',
              label: 'Deliver Files',
              type: 'static',
              text:     'Please find the final deliverables attached.\nThank you very much for the commission — it was a pleasure working with you. I look forward to working with you again in the future.',
              textWarm: "Here are your files!\nThank you so much for commissioning me — I had a blast working on this. Feel free to reach out anytime!"
            }
          ]
        }
      ]
    }
  ]
}
