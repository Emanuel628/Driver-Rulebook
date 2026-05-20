import type { GuidePage } from '../types/content';

export const sixtySeventyRecapPage: GuidePage = {
  id: 'sixty-seventy-recap',
  chapter: 7,
  title: '60/70-Hour Rule and Recap',
  category: 'hos',
  summary: 'The 60/70-hour rule limits driving after too much on-duty time in a rolling 7- or 8-day period, and recap hours are how older on-duty hours fall out of that rolling window.',
  content: [
    { id: 'sixty-seventy-recap-p1', type: 'summary', title: 'The basic rule', text: 'For many property-carrying drivers under federal HOS rules, a driver may not drive after being on duty 60 hours in any 7 consecutive days, or 70 hours in any 8 consecutive days. Which limit applies depends on the motor carrier operation.' },
    { id: 'sixty-seventy-recap-p2', type: 'warning', title: 'This is an on-duty limit', text: 'The 60/70-hour rule is based on on-duty time. Driving, loading, inspections, fueling, paperwork, and other on-duty work can count toward the cycle. A driver can have daily driving time available and still be blocked by the cycle limit.' },
    { id: 'sixty-seventy-recap-p3', type: 'paragraph', text: 'The 60-hour/7-day limit generally applies when the motor carrier does not operate commercial motor vehicles every day of the week. The 70-hour/8-day limit generally applies when the motor carrier operates commercial motor vehicles every day of the week.' },
    { id: 'sixty-seventy-recap-p4', type: 'paragraph', text: 'The cycle is rolling. The driver looks backward over the current 7-day or 8-day window, not just at a fixed calendar week. As older days fall out of the window, their on-duty hours stop counting against the current cycle.' },
    { id: 'sixty-seventy-recap-p5', type: 'paragraph', text: 'Recap is the practical name drivers use when older on-duty hours fall out of the rolling cycle and become available again. Recap is not extra time; it is the rolling calculation updating as older on-duty hours age out.' },
    { id: 'sixty-seventy-recap-p6', type: 'paragraph', text: 'A 34-hour restart is different from running on recap. Under the federal property-carrying rules, a valid 34 consecutive hours off duty can restart the 60/70-hour calculation. Recap uses rolling-window math without necessarily taking a full restart.' },
    { id: 'sixty-seventy-recap-p7', type: 'paragraph', text: 'The 60/70-hour rule does not replace the daily limits. A driver with cycle hours available must still satisfy the 11-hour driving limit, 14-hour window, 30-minute break rule, and any applicable exception requirements.' },
    { id: 'sixty-seventy-recap-p8', type: 'paragraph', text: 'Passenger-carrying HOS rules also include 60/70-hour limits, but passenger rules differ from property-carrying rules in other daily limits. Confirm which rule set applies before using this page.' },
    { id: 'sixty-seventy-recap-p9', type: 'example', title: 'Example: daily time left but no cycle time', text: 'A driver starts the day with several daily driving hours left but only 30 minutes left on the 70-hour/8-day cycle. After 30 more minutes of on-duty time, the driver may be out of cycle hours even though daily driving time remains.' },
    { id: 'sixty-seventy-recap-p10', type: 'example', title: 'Example: recap hours return', text: 'A driver on a 70-hour/8-day cycle had 9 on-duty hours on the oldest day in the rolling window. When that day falls out of the 8-day calculation, those 9 hours may become available again if all other limits are also satisfied.' },
    { id: 'sixty-seventy-recap-p11', type: 'example', title: 'Example: 34-hour restart', text: 'A driver takes 34 consecutive hours off duty. If the restart is valid and no company restriction is stricter, the 60/70-hour calculation can restart. That is different from waiting for old hours to recap back one day at a time.' },
    { id: 'sixty-seventy-recap-p12', type: 'checklist', title: 'Quick 60/70-hour check', items: ['Confirm whether the carrier uses the 60-hour/7-day cycle or 70-hour/8-day cycle.', 'Count on-duty time, not just driving time.', 'Use the rolling 7- or 8-day window.', 'Check whether old on-duty hours are recapping back.', 'Check whether a valid 34-hour restart occurred.', 'Check the 11-hour driving limit separately.', 'Check the 14-hour window and 30-minute break rule separately.', 'Verify company policy, state rules, and exceptions before acting.'] },
    { id: 'sixty-seventy-recap-p13', type: 'warning', title: 'Do not guess cycle hours', text: 'Cycle-hour mistakes can create violations even when the daily clocks look fine. Use the driver’s actual log or ELD summary, the carrier cycle setting, and the official rule before deciding whether driving is allowed.' }
  ],
  audioScript: '60/70-hour rule and recap. For many property-carrying drivers, the driver may not drive after being on duty 60 hours in any 7 consecutive days, or 70 hours in any 8 consecutive days. The cycle is based on on-duty time, not just driving time. Recap means older on-duty hours fall out of the rolling 7- or 8-day window and may become available again. A 34-hour restart is different from recap because it can restart the cycle after 34 consecutive hours off duty. Always verify with the official rule and actual records.',
  tags: ['60 hour rule', '70 hour rule', 'recap', 'cycle hours', 'on duty time', '7 consecutive days', '8 consecutive days', '34 hour restart', 'hos'],
  sources: [
    { title: 'Summary of Hours of Service Regulations', agency: 'FMCSA', url: 'https://www.fmcsa.dot.gov/regulations/hours-service/summary-hours-service-regulations', note: 'FMCSA summary explaining the 60/70-hour limit and 34-hour restart.' },
    { title: '49 CFR Section 395.3', agency: 'eCFR', url: 'https://www.ecfr.gov/current/title-49/section-395.3', note: 'Official eCFR text for property-carrying maximum driving time and 60/70-hour provisions.' },
    { title: 'Interstate Truck Driver\'s Guide to Hours of Service', agency: 'FMCSA', url: 'https://www.fmcsa.dot.gov/regulations/hours-service/interstate-truck-drivers-guide-hours-service', note: 'FMCSA driver guide explaining HOS cycle concepts.' }
  ],
  lastReviewed: '2026-05-20'
};
