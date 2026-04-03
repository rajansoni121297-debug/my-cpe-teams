import { useState, useEffect, useRef } from 'react';
import './Reports.css';
import FeedbackDrawer from './FeedbackDrawer';

interface ReportItem {
  name: string;
  email: string;
  reportingManager?: string;
  assessment: string;
  type: string;
  score: string;
  result: string;
  assignedOn: string;
  status: string;
  assignedBy: string;
  completedOn: string;
  proctoring: string;
  flags: number;
  feedback?: {
    submitted: boolean;
    overallExperience?: number;
    assessmentClearBadge?: string;
    assessmentClearText?: string;
    hadIssuesBadge?: string;
    issueDetail?: string;
    improvement?: string;
  };
}

const internalData: ReportItem[] = [
  { name: 'Olivia Martinez', email: 'olivia.martinez@yopmail.com', reportingManager: '-', assessment: 'NPO Audit', type: 'MCQ', score: '0%', result: "Doesn't Match", assignedOn: 'Mar 13, 2026', status: 'Completed', assignedBy: 'Thomas Anderson', completedOn: 'Mar 13, 2026', proctoring: 'Clean', flags: 1, feedback: { submitted: true, overallExperience: 4, assessmentClearBadge: 'Yes', hadIssuesBadge: 'No Issues', improvement: 'The time limit could be slightly more flexible for complex questions.' } },
  { name: 'James Wilson', email: 'james.wilson@yopmail.com', reportingManager: 'Sarah Mitchell', assessment: 'NPO Audit', type: 'MCQ', score: '78%', result: 'Pass', assignedOn: 'Mar 13, 2026', status: 'Completed', assignedBy: 'Thomas Anderson', completedOn: 'Mar 13, 2026', proctoring: 'Clean', flags: 0, feedback: { submitted: true, overallExperience: 3, assessmentClearBadge: 'Yes', hadIssuesBadge: 'No Issues', improvement: 'More practice questions would help.' } },
  { name: 'Sophia Patel', email: 'sophia.patel@yopmail.com', reportingManager: '-', assessment: 'Accounting Fundamentals for NFP Organizations', type: 'MCQ, Subjective', score: '0%', result: "Doesn't Match", assignedOn: 'Mar 11, 2026', status: 'Completed', assignedBy: 'Thomas Anderson', completedOn: 'Mar 11, 2026', proctoring: 'Clean', flags: 2, feedback: { submitted: true, overallExperience: 2, assessmentClearText: 'Some questions were ambiguous.', hadIssuesBadge: 'Minor Issues', issueDetail: 'Page reloaded unexpectedly during question 8.', improvement: 'Better question clarity and stable platform.' } },
  { name: 'Liam Rodriguez', email: 'liam.rodriguez@yopmail.com', reportingManager: 'Sarah Mitchell', assessment: 'Data Interpretation and Logical Reasoning', type: 'MCQ, Simulation, Subjective, Case Study', score: '-', result: '-', assignedOn: 'Mar 06, 2026', status: 'Pending', assignedBy: 'Thomas Anderson', completedOn: '-', proctoring: '-', flags: 0 },
  { name: 'Emma Thompson', email: 'emma.thompson@yopmail.com', reportingManager: '-', assessment: 'Single Audit and Uniform Guidance', type: 'Subjective', score: '0%', result: "Doesn't Match", assignedOn: 'Apr 11, 2026', status: 'Completed', assignedBy: 'Thomas Anderson', completedOn: 'Mar 11, 2026', proctoring: 'Need to review', flags: 37, feedback: { submitted: false } },
  { name: 'Noah Garcia', email: 'noah.garcia@yopmail.com', reportingManager: 'James Wilson', assessment: 'Single Audit and Uniform Guidance', type: 'MCQ, Subjective', score: '62%', result: 'Pass', assignedOn: 'Mar 11, 2026', status: 'Completed', assignedBy: 'Thomas Anderson', completedOn: 'Mar 11, 2026', proctoring: 'Need to review', flags: 4, feedback: { submitted: true, overallExperience: 5, assessmentClearBadge: 'Yes', hadIssuesBadge: 'No Issues', improvement: 'Everything was great.' } },
  { name: 'Ketan Shah', email: 'ketanshah896@yopmail.com', reportingManager: '-', assessment: 'QuickBooks - QBO', type: 'Simulation', score: '-', result: '-', assignedOn: 'Mar 19, 2026', status: 'Pending', assignedBy: 'Thomas Anderson', completedOn: '-', proctoring: '-', flags: 0 },
  { name: 'Deepak Verma', email: 'deepak.verma@yopmail.com', reportingManager: '-', assessment: 'QuickBooks - QBO', type: 'MCQ', score: '0%', result: 'Fail', assignedOn: 'Mar 19, 2026', status: 'Completed', assignedBy: 'Thomas Anderson', completedOn: 'Mar 19, 2026', proctoring: 'Need to review', flags: 21, feedback: { submitted: true, overallExperience: 1, assessmentClearText: 'Questions did not match the study material provided.', hadIssuesBadge: 'Minor Issues', issueDetail: 'Camera kept disconnecting during the proctored session.', improvement: 'Fix webcam integration and align questions with curriculum.' } },
  { name: 'Ronald Chris', email: 'RonaldChris2323@yopmail.com', reportingManager: 'Sarah Mitchell', assessment: 'Lacerte Tax Software', type: 'Subjective', score: '-', result: '-', assignedOn: 'Mar 18, 2026', status: 'Pending', assignedBy: 'Thomas Anderson', completedOn: '-', proctoring: '-', flags: 0 },
  { name: 'Isabella Nguyen', email: 'isabella.n@yopmail.com', reportingManager: '-', assessment: 'UltraTax Software', type: 'Simulation', score: '-', result: '-', assignedOn: 'Mar 18, 2026', status: 'Pending', assignedBy: 'Thomas Anderson', completedOn: '-', proctoring: '-', flags: 0 },
  { name: 'William Davis', email: 'william.davis@yopmail.com', reportingManager: '-', assessment: 'CCH Axcess + ProSystem fx Audit Software', type: 'MCQ, Simulation', score: '-', result: '-', assignedOn: 'Mar 18, 2026', status: 'Pending', assignedBy: 'Thomas Anderson', completedOn: '-', proctoring: '-', flags: 0 },
  { name: 'Ava Johnson', email: 'ava.johnson@yopmail.com', reportingManager: 'James Wilson', assessment: 'Yellow Book (GAGAS)', type: 'MCQ', score: '-', result: '-', assignedOn: 'Mar 18, 2026', status: 'Pending', assignedBy: 'Thomas Anderson', completedOn: '-', proctoring: '-', flags: 0 },
  { name: 'Norman Salia', email: 'NormanSalia@yopmail.com', reportingManager: '-', assessment: 'NPO Audit', type: 'MCQ, Simulation', score: '-', result: '-', assignedOn: 'Mar 17, 2026', status: 'Pending', assignedBy: 'Thomas Anderson', completedOn: '-', proctoring: '-', flags: 0 },
  { name: 'Sam John', email: 'SamJohn12@yopmail.com', reportingManager: '-', assessment: 'Accounting Fundamentals for NFP Organizations', type: 'Subjective', score: '-', result: '-', assignedOn: 'Mar 12, 2026', status: 'Pending', assignedBy: 'Thomas Anderson', completedOn: '-', proctoring: '-', flags: 0 },
  { name: 'Ananya Rao', email: 'ananya.rao@yopmail.com', reportingManager: '-', assessment: 'Testing Part assessments', type: 'MCQ, Simulation, Subjective', score: '-', result: '-', assignedOn: 'Mar 10, 2026', status: 'Pending', assignedBy: 'Thomas Anderson', completedOn: '-', proctoring: '-', flags: 0 },
  { name: 'Benjamin Clark', email: 'benjamin.clark@yopmail.com', reportingManager: '-', assessment: 'Testing Part assessments', type: 'MCQ, Case Study', score: '-', result: '-', assignedOn: 'Mar 10, 2026', status: 'Pending', assignedBy: 'Thomas Anderson', completedOn: '-', proctoring: '-', flags: 0 },
  { name: 'Ethan Parker', email: 'ethan.parker@yopmail.com', reportingManager: 'Sarah Mitchell', assessment: 'Estate & Gift Tax', type: 'Subjective', score: '72%', result: 'Pass', assignedOn: 'Feb 17, 2026', status: 'Completed', assignedBy: 'Thomas Anderson', completedOn: 'Feb 18, 2026', proctoring: 'Clean', flags: 0, feedback: { submitted: true, overallExperience: 5, assessmentClearBadge: 'Yes', hadIssuesBadge: 'No Issues', improvement: 'No suggestions, everything was smooth.' } },
  { name: 'Priya Sharma', email: 'priya.sharma@yopmail.com', reportingManager: '-', assessment: 'QuickBooks - QBO', type: 'Simulation', score: '85%', result: 'Pass', assignedOn: 'Feb 15, 2026', status: 'Completed', assignedBy: 'Thomas Anderson', completedOn: 'Feb 16, 2026', proctoring: 'Clean', flags: 0, feedback: { submitted: true, overallExperience: 4, assessmentClearBadge: 'Yes', hadIssuesBadge: 'No Issues', improvement: 'Add more scenario-based questions.' } },
  { name: 'David Chen', email: 'david.chen@yopmail.com', reportingManager: 'James Wilson', assessment: 'UltraTax Software', type: 'MCQ, Simulation', score: '45%', result: 'Fail', assignedOn: 'Feb 14, 2026', status: 'Completed', assignedBy: 'Thomas Anderson', completedOn: 'Feb 15, 2026', proctoring: 'Need to review', flags: 12, feedback: { submitted: true, overallExperience: 2, assessmentClearText: 'Simulation section was confusing.', hadIssuesBadge: 'Minor Issues', issueDetail: 'Simulation environment lagged significantly.', improvement: 'Improve simulation performance and add clearer instructions.' } },
  { name: 'Sarah Williams', email: 'sarah.w@yopmail.com', reportingManager: '-', assessment: 'Ethics and Professional Conduct', type: 'Subjective', score: '-', result: '-', assignedOn: 'Feb 10, 2026', status: 'Lapsed', assignedBy: 'Thomas Anderson', completedOn: '-', proctoring: '-', flags: 0 },
  { name: 'Michael Brown', email: 'michael.b@yopmail.com', reportingManager: '-', assessment: 'Governmental Accounting and Financial Reporting', type: 'MCQ, Subjective', score: '-', result: '-', assignedOn: 'Feb 08, 2026', status: 'Lapsed', assignedBy: 'Thomas Anderson', completedOn: '-', proctoring: '-', flags: 0 },
  { name: 'Jessica Lee', email: 'jessica.lee@yopmail.com', reportingManager: '-', assessment: 'Drake Tax Software', type: 'MCQ, Simulation', score: '68%', result: 'Pass', assignedOn: 'Feb 05, 2026', status: 'Completed', assignedBy: 'Thomas Anderson', completedOn: 'Feb 06, 2026', proctoring: 'Clean', flags: 0, feedback: { submitted: true, overallExperience: 4, assessmentClearBadge: 'Yes', hadIssuesBadge: 'No Issues', improvement: 'Longer time for simulation questions.' } },
  { name: 'Andrew Malcham', email: 'andrew.m@yopmail.com', reportingManager: '-', assessment: 'CCH Axcess Tax Software', type: 'Simulation', score: '-', result: '-', assignedOn: 'Feb 03, 2026', status: 'Pending', assignedBy: 'Thomas Anderson', completedOn: '-', proctoring: '-', flags: 0 },
  { name: 'Manvi Jain', email: 'manvi.j@yopmail.com', reportingManager: '-', assessment: 'Financial Analysis and Readiness', type: 'MCQ, Simulation', score: '55%', result: 'Fail', assignedOn: 'Jan 28, 2026', status: 'Completed', assignedBy: 'Thomas Anderson', completedOn: 'Jan 30, 2026', proctoring: 'Need to review', flags: 8, feedback: { submitted: false } },
  { name: 'Raj Soni', email: 'raj.soni@yopmail.com', reportingManager: '-', assessment: 'Tax Operations for Virtual Assistants', type: 'MCQ', score: '91%', result: 'Pass', assignedOn: 'Jan 25, 2026', status: 'Completed', assignedBy: 'Thomas Anderson', completedOn: 'Jan 26, 2026', proctoring: 'Clean', flags: 0, feedback: { submitted: true, overallExperience: 5, assessmentClearBadge: 'Yes', hadIssuesBadge: 'No Issues', improvement: 'Perfect assessment experience.' } },
  { name: 'Vikram Mehta', email: 'vikram.m@yopmail.com', reportingManager: 'Sarah Mitchell', assessment: 'Behavioral Finance: How to Bring Your Best', type: 'Subjective', score: '-', result: '-', assignedOn: 'Jan 22, 2026', status: 'Lapsed', assignedBy: 'Thomas Anderson', completedOn: '-', proctoring: '-', flags: 0 },
  { name: 'Grace Kim', email: 'grace.kim@yopmail.com', reportingManager: '-', assessment: 'Personal Finance Trends Mastery', type: 'MCQ, Case Study', score: '82%', result: 'Pass', assignedOn: 'Jan 20, 2026', status: 'Completed', assignedBy: 'Thomas Anderson', completedOn: 'Jan 21, 2026', proctoring: 'Clean', flags: 0, feedback: { submitted: true, overallExperience: 4, assessmentClearBadge: 'Yes', hadIssuesBadge: 'No Issues', improvement: 'Great content.' } },
  { name: 'Daniel Foster', email: 'daniel.f@yopmail.com', reportingManager: '-', assessment: 'Building Resilient Portfolios: Mitigating Risk', type: 'Simulation', score: '-', result: '-', assignedOn: 'Jan 18, 2026', status: 'Pending', assignedBy: 'Thomas Anderson', completedOn: '-', proctoring: '-', flags: 0 },
  { name: 'Aisha Khan', email: 'aisha.khan@yopmail.com', reportingManager: '-', assessment: '10-Point Financial Health Check', type: 'MCQ', score: '33%', result: 'Fail', assignedOn: 'Jan 15, 2026', status: 'Completed', assignedBy: 'Thomas Anderson', completedOn: 'Jan 16, 2026', proctoring: 'Need to review', flags: 5, feedback: { submitted: true, overallExperience: 2, assessmentClearText: 'Too many trick questions.', hadIssuesBadge: 'Minor Issues', issueDetail: 'Browser froze twice.', improvement: 'Simpler question wording.' } },
  { name: 'Carlos Rivera', email: 'carlos.r@yopmail.com', reportingManager: '-', assessment: 'AI and Real Estate: Your Winning Investment Strategy', type: 'MCQ, Simulation', score: '-', result: '-', assignedOn: 'Jan 12, 2026', status: 'Lapsed', assignedBy: 'Thomas Anderson', completedOn: '-', proctoring: '-', flags: 0 },
  { name: 'Megan Scott', email: 'megan.scott@yopmail.com', reportingManager: 'James Wilson', assessment: 'A to Z of Time Value of Money', type: 'Case Study', score: '76%', result: 'Pass', assignedOn: 'Jan 10, 2026', status: 'Completed', assignedBy: 'Thomas Anderson', completedOn: 'Jan 11, 2026', proctoring: 'Clean', flags: 0, feedback: { submitted: true, overallExperience: 5, assessmentClearBadge: 'Yes', hadIssuesBadge: 'No Issues', improvement: 'Excellent case studies.' } },
  { name: 'Ryan Cooper', email: 'ryan.cooper@yopmail.com', reportingManager: '-', assessment: 'Buy Low, Sell High. Why is it so Difficult?', type: 'MCQ, Subjective', score: '-', result: '-', assignedOn: 'Jan 08, 2026', status: 'Pending', assignedBy: 'Thomas Anderson', completedOn: '-', proctoring: '-', flags: 0 },
  { name: 'Nisha Gupta', email: 'nisha.gupta@yopmail.com', reportingManager: '-', assessment: 'Are Your Clients Financially Healthy?', type: 'MCQ', score: '48%', result: 'Fail', assignedOn: 'Jan 05, 2026', status: 'Completed', assignedBy: 'Thomas Anderson', completedOn: 'Jan 06, 2026', proctoring: 'Need to review', flags: 14, feedback: { submitted: false } },
  { name: 'Tyler Brooks', email: 'tyler.b@yopmail.com', reportingManager: '-', assessment: 'Advisors Guide to an Advanced Look at Estate Planning', type: 'Simulation, Case Study', score: '-', result: '-', assignedOn: 'Jan 03, 2026', status: 'Lapsed', assignedBy: 'Thomas Anderson', completedOn: '-', proctoring: '-', flags: 0 },
  { name: 'Emily Watson', email: 'emily.watson@yopmail.com', reportingManager: '-', assessment: 'An Overview of Financial Planning – Deep Dive', type: 'MCQ', score: '89%', result: 'Pass', assignedOn: 'Dec 28, 2025', status: 'Completed', assignedBy: 'Thomas Anderson', completedOn: 'Dec 29, 2025', proctoring: 'Clean', flags: 0, feedback: { submitted: true, overallExperience: 5, assessmentClearBadge: 'Yes', hadIssuesBadge: 'No Issues', improvement: 'Nothing to improve.' } },
  { name: 'Jason Park', email: 'jason.park@yopmail.com', reportingManager: '-', assessment: 'A Million Dollar Baby - Investment Strategies', type: 'MCQ, Simulation, Subjective', score: '27%', result: 'Fail', assignedOn: 'Dec 25, 2025', status: 'Completed', assignedBy: 'Thomas Anderson', completedOn: 'Dec 26, 2025', proctoring: 'Need to review', flags: 19, feedback: { submitted: true, overallExperience: 1, assessmentClearText: 'Very difficult.', hadIssuesBadge: 'Minor Issues', issueDetail: 'Proctoring camera had issues.', improvement: 'Reduce difficulty or add study materials.' } },
  { name: 'Hannah Mitchell', email: 'hannah.m@yopmail.com', reportingManager: '-', assessment: 'Governmental Accounting and Financial Reporting', type: 'Subjective', score: '-', result: '-', assignedOn: 'Dec 22, 2025', status: 'Pending', assignedBy: 'Thomas Anderson', completedOn: '-', proctoring: '-', flags: 0 },
  { name: 'Kevin Turner', email: 'kevin.turner@yopmail.com', reportingManager: '-', assessment: 'Ethics and Professional Conduct for Accountants', type: 'MCQ', score: '-', result: '-', assignedOn: 'Dec 20, 2025', status: 'Lapsed', assignedBy: 'Thomas Anderson', completedOn: '-', proctoring: '-', flags: 0 },
];

const externalData: ReportItem[] = [
  { name: 'Ketan Shah', email: 'ketanshah896@yopmail.com', assessment: 'QuickBooks - QBO', type: 'MCQ', score: '-', result: '-', assignedOn: 'Mar 19, 2026', status: 'Pending', assignedBy: 'Thomas Anderson', completedOn: '-', proctoring: '-', flags: 0 },
  { name: 'Deepak Verma', email: 'deepak.v@yopmail.com', assessment: 'QuickBooks - QBO', type: 'MCQ', score: '0%', result: 'Fail', assignedOn: 'Mar 19, 2026', status: 'Completed', assignedBy: 'Thomas Anderson', completedOn: 'Mar 19, 2026', proctoring: 'Need to review', flags: 21, feedback: { submitted: true, overallExperience: 1, assessmentClearText: 'Did not match study material.', hadIssuesBadge: 'Minor Issues', issueDetail: 'Camera kept disconnecting.', improvement: 'Fix webcam and align questions.' } },
  { name: 'Ronald Chris', email: 'ronald.chris@yopmail.com', assessment: 'Lacerte Tax Software', type: 'Subjective', score: '-', result: '-', assignedOn: 'Mar 18, 2026', status: 'Pending', assignedBy: 'Thomas Anderson', completedOn: '-', proctoring: '-', flags: 0 },
  { name: 'Isabella Nguyen', email: 'isabella.n@yopmail.com', assessment: 'UltraTax Software', type: 'Simulation', score: '-', result: '-', assignedOn: 'Mar 18, 2026', status: 'Pending', assignedBy: 'Thomas Anderson', completedOn: '-', proctoring: '-', flags: 0 },
  { name: 'William Davis', email: 'william.d@yopmail.com', assessment: 'CCH Axcess + ProSystem fx Audit Software', type: 'MCQ, Simulation', score: '-', result: '-', assignedOn: 'Mar 18, 2026', status: 'Pending', assignedBy: 'Thomas Anderson', completedOn: '-', proctoring: '-', flags: 0 },
  { name: 'Ava Johnson', email: 'ava.johnson@yopmail.com', assessment: 'Yellow Book (GAGAS)', type: 'MCQ', score: '-', result: '-', assignedOn: 'Mar 18, 2026', status: 'Pending', assignedBy: 'Thomas Anderson', completedOn: '-', proctoring: '-', flags: 0 },
  { name: 'Norman Salia', email: 'norman.s@yopmail.com', assessment: 'NPO Audit', type: 'MCQ, Simulation', score: '-', result: '-', assignedOn: 'Mar 17, 2026', status: 'Pending', assignedBy: 'Thomas Anderson', completedOn: '-', proctoring: '-', flags: 0 },
  { name: 'Sam John', email: 'sam.john@yopmail.com', assessment: 'Accounting Fundamentals for NFP Organizations', type: 'Subjective', score: '-', result: '-', assignedOn: 'Mar 12, 2026', status: 'Pending', assignedBy: 'Thomas Anderson', completedOn: '-', proctoring: '-', flags: 0 },
  { name: 'Ananya Rao', email: 'ananya.rao@yopmail.com', assessment: 'Testing Part assessments', type: 'MCQ, Simulation, Subjective', score: '-', result: '-', assignedOn: 'Mar 10, 2026', status: 'Pending', assignedBy: 'Thomas Anderson', completedOn: '-', proctoring: '-', flags: 0 },
  { name: 'Benjamin Clark', email: 'benjamin.c@yopmail.com', assessment: 'Testing Part assessments', type: 'MCQ, Case Study', score: '-', result: '-', assignedOn: 'Mar 10, 2026', status: 'Pending', assignedBy: 'Thomas Anderson', completedOn: '-', proctoring: '-', flags: 0 },
  { name: 'Lisa Chen', email: 'lisa.chen@yopmail.com', assessment: 'Drake Tax Software', type: 'MCQ', score: '65%', result: 'Pass', assignedOn: 'Mar 08, 2026', status: 'Completed', assignedBy: 'Thomas Anderson', completedOn: 'Mar 09, 2026', proctoring: 'Clean', flags: 0, feedback: { submitted: true, overallExperience: 4, assessmentClearBadge: 'Yes', hadIssuesBadge: 'No Issues', improvement: 'Good assessment.' } },
  { name: 'Ahmed Hassan', email: 'ahmed.h@yopmail.com', assessment: 'CCH Axcess Tax Software', type: 'Simulation', score: '42%', result: 'Fail', assignedOn: 'Mar 06, 2026', status: 'Completed', assignedBy: 'Thomas Anderson', completedOn: 'Mar 07, 2026', proctoring: 'Need to review', flags: 9, feedback: { submitted: true, overallExperience: 2, assessmentClearText: 'Simulation was buggy.', hadIssuesBadge: 'Minor Issues', issueDetail: 'Environment crashed once.', improvement: 'Stabilize simulation.' } },
  { name: 'Rachel Moore', email: 'rachel.m@yopmail.com', assessment: 'Estate & Gift Tax', type: 'MCQ, Subjective', score: '-', result: '-', assignedOn: 'Mar 04, 2026', status: 'Lapsed', assignedBy: 'Thomas Anderson', completedOn: '-', proctoring: '-', flags: 0 },
  { name: 'Chris Taylor', email: 'chris.t@yopmail.com', assessment: 'Ethics and Professional Conduct', type: 'Case Study', score: '88%', result: 'Pass', assignedOn: 'Mar 02, 2026', status: 'Completed', assignedBy: 'Thomas Anderson', completedOn: 'Mar 03, 2026', proctoring: 'Clean', flags: 0, feedback: { submitted: true, overallExperience: 5, assessmentClearBadge: 'Yes', hadIssuesBadge: 'No Issues', improvement: 'Excellent.' } },
  { name: 'Pooja Kapoor', email: 'pooja.k@yopmail.com', assessment: 'Governmental Accounting and Financial Reporting', type: 'MCQ', score: '-', result: '-', assignedOn: 'Feb 28, 2026', status: 'Pending', assignedBy: 'Thomas Anderson', completedOn: '-', proctoring: '-', flags: 0 },
  { name: 'Mark Stevens', email: 'mark.s@yopmail.com', assessment: 'Financial Analysis and Readiness Assessment', type: 'MCQ, Simulation, Case Study', score: '52%', result: 'Fail', assignedOn: 'Feb 25, 2026', status: 'Completed', assignedBy: 'Thomas Anderson', completedOn: 'Feb 26, 2026', proctoring: 'Need to review', flags: 7, feedback: { submitted: false } },
  { name: 'Fatima Al-Rashid', email: 'fatima.ar@yopmail.com', assessment: 'Tax Operations for Virtual Assistants', type: 'MCQ', score: '94%', result: 'Pass', assignedOn: 'Feb 22, 2026', status: 'Completed', assignedBy: 'Thomas Anderson', completedOn: 'Feb 23, 2026', proctoring: 'Clean', flags: 0, feedback: { submitted: true, overallExperience: 5, assessmentClearBadge: 'Yes', hadIssuesBadge: 'No Issues', improvement: 'Perfect.' } },
  { name: 'Jake Robinson', email: 'jake.r@yopmail.com', assessment: 'Single Audit and Uniform Guidance', type: 'Subjective', score: '-', result: '-', assignedOn: 'Feb 20, 2026', status: 'Lapsed', assignedBy: 'Thomas Anderson', completedOn: '-', proctoring: '-', flags: 0 },
  { name: 'Sophie Wright', email: 'sophie.w@yopmail.com', assessment: 'Data Interpretation and Logical Reasoning', type: 'MCQ, Simulation, Subjective, Case Study', score: '71%', result: 'Pass', assignedOn: 'Feb 18, 2026', status: 'Completed', assignedBy: 'Thomas Anderson', completedOn: 'Feb 19, 2026', proctoring: 'Clean', flags: 0, feedback: { submitted: true, overallExperience: 4, assessmentClearBadge: 'Yes', hadIssuesBadge: 'No Issues', improvement: 'More time for case studies.' } },
  { name: 'Omar Khalil', email: 'omar.k@yopmail.com', assessment: 'NPO Audit', type: 'MCQ', score: '15%', result: 'Fail', assignedOn: 'Feb 15, 2026', status: 'Completed', assignedBy: 'Thomas Anderson', completedOn: 'Feb 16, 2026', proctoring: 'Need to review', flags: 25, feedback: { submitted: true, overallExperience: 1, assessmentClearText: 'Very confusing format.', hadIssuesBadge: 'Minor Issues', issueDetail: 'Multiple technical glitches.', improvement: 'Overhaul the testing platform.' } },
  { name: 'Natalie Hughes', email: 'natalie.h@yopmail.com', assessment: 'Behavioral Finance: How to Bring Your Best', type: 'Simulation', score: '-', result: '-', assignedOn: 'Feb 12, 2026', status: 'Pending', assignedBy: 'Thomas Anderson', completedOn: '-', proctoring: '-', flags: 0 },
  { name: 'Arjun Reddy', email: 'arjun.r@yopmail.com', assessment: 'Personal Finance Trends Mastery', type: 'MCQ, Case Study', score: '-', result: '-', assignedOn: 'Feb 10, 2026', status: 'Lapsed', assignedBy: 'Thomas Anderson', completedOn: '-', proctoring: '-', flags: 0 },
  { name: 'Madison Green', email: 'madison.g@yopmail.com', assessment: 'Building Resilient Portfolios: Mitigating Risk', type: 'MCQ', score: '73%', result: 'Pass', assignedOn: 'Feb 08, 2026', status: 'Completed', assignedBy: 'Thomas Anderson', completedOn: 'Feb 09, 2026', proctoring: 'Clean', flags: 0, feedback: { submitted: true, overallExperience: 4, assessmentClearBadge: 'Yes', hadIssuesBadge: 'No Issues', improvement: 'Add more examples.' } },
  { name: 'Lucas Martinez', email: 'lucas.m@yopmail.com', assessment: '10-Point Financial Health Check', type: 'Subjective', score: '38%', result: 'Fail', assignedOn: 'Feb 05, 2026', status: 'Completed', assignedBy: 'Thomas Anderson', completedOn: 'Feb 06, 2026', proctoring: 'Need to review', flags: 11, feedback: { submitted: false } },
  { name: 'Sarah Mitchell', email: 'sarah.m2@yopmail.com', assessment: 'AI and Real Estate: Your Winning Investment Strategy', type: 'MCQ, Simulation', score: '-', result: '-', assignedOn: 'Feb 03, 2026', status: 'Pending', assignedBy: 'Thomas Anderson', completedOn: '-', proctoring: '-', flags: 0 },
  { name: 'Jordan Lee', email: 'jordan.l@yopmail.com', assessment: 'A to Z of Time Value of Money', type: 'Case Study', score: '81%', result: 'Pass', assignedOn: 'Jan 30, 2026', status: 'Completed', assignedBy: 'Thomas Anderson', completedOn: 'Jan 31, 2026', proctoring: 'Clean', flags: 0, feedback: { submitted: true, overallExperience: 5, assessmentClearBadge: 'Yes', hadIssuesBadge: 'No Issues', improvement: 'Loved the case study format.' } },
  { name: 'Priyanka Desai', email: 'priyanka.d@yopmail.com', assessment: 'Buy Low, Sell High. Why is it so Difficult?', type: 'MCQ', score: '-', result: '-', assignedOn: 'Jan 28, 2026', status: 'Lapsed', assignedBy: 'Thomas Anderson', completedOn: '-', proctoring: '-', flags: 0 },
  { name: 'Alex Thompson', email: 'alex.t@yopmail.com', assessment: 'Are Your Clients Financially Healthy?', type: 'MCQ, Subjective', score: '59%', result: 'Fail', assignedOn: 'Jan 25, 2026', status: 'Completed', assignedBy: 'Thomas Anderson', completedOn: 'Jan 26, 2026', proctoring: 'Need to review', flags: 3, feedback: { submitted: true, overallExperience: 3, assessmentClearBadge: 'Yes', hadIssuesBadge: 'No Issues', improvement: 'Needs clearer grading criteria.' } },
  { name: 'Meera Iyer', email: 'meera.i@yopmail.com', assessment: 'Advisors Guide to Serving The Next Generation', type: 'Simulation', score: '-', result: '-', assignedOn: 'Jan 22, 2026', status: 'Pending', assignedBy: 'Thomas Anderson', completedOn: '-', proctoring: '-', flags: 0 },
  { name: 'Nathan Brooks', email: 'nathan.b@yopmail.com', assessment: 'An Overview of Financial Planning – Deep Dive', type: 'MCQ, Simulation, Subjective', score: '44%', result: 'Fail', assignedOn: 'Jan 20, 2026', status: 'Completed', assignedBy: 'Thomas Anderson', completedOn: 'Jan 21, 2026', proctoring: 'Need to review', flags: 16, feedback: { submitted: true, overallExperience: 2, assessmentClearText: 'Too long.', hadIssuesBadge: 'Minor Issues', issueDetail: 'Session timed out unexpectedly.', improvement: 'Shorter assessment or save progress.' } },
  { name: 'Zara Patel', email: 'zara.p@yopmail.com', assessment: 'A Million Dollar Baby - Investment Strategies', type: 'MCQ', score: '86%', result: 'Pass', assignedOn: 'Jan 18, 2026', status: 'Completed', assignedBy: 'Thomas Anderson', completedOn: 'Jan 19, 2026', proctoring: 'Clean', flags: 0, feedback: { submitted: true, overallExperience: 5, assessmentClearBadge: 'Yes', hadIssuesBadge: 'No Issues', improvement: 'Wonderful experience.' } },
  { name: 'Derek Hall', email: 'derek.h@yopmail.com', assessment: 'Governmental Accounting and Financial Reporting', type: 'Subjective', score: '-', result: '-', assignedOn: 'Jan 15, 2026', status: 'Lapsed', assignedBy: 'Thomas Anderson', completedOn: '-', proctoring: '-', flags: 0 },
  { name: 'Simone Baker', email: 'simone.b@yopmail.com', assessment: 'Ethics and Professional Conduct for Accountants', type: 'MCQ, Case Study', score: '-', result: '-', assignedOn: 'Jan 12, 2026', status: 'Pending', assignedBy: 'Thomas Anderson', completedOn: '-', proctoring: '-', flags: 0 },
  { name: 'Rohit Sharma', email: 'rohit.s@yopmail.com', assessment: 'QuickBooks - QBO Advanced', type: 'Simulation, Case Study', score: '67%', result: 'Pass', assignedOn: 'Jan 10, 2026', status: 'Completed', assignedBy: 'Thomas Anderson', completedOn: 'Jan 11, 2026', proctoring: 'Clean', flags: 0, feedback: { submitted: true, overallExperience: 4, assessmentClearBadge: 'Yes', hadIssuesBadge: 'No Issues', improvement: 'Good simulation quality.' } },
  { name: 'Chloe Evans', email: 'chloe.e@yopmail.com', assessment: 'UltraTax Software Advanced Module', type: 'MCQ, Simulation', score: '29%', result: 'Fail', assignedOn: 'Jan 08, 2026', status: 'Completed', assignedBy: 'Thomas Anderson', completedOn: 'Jan 09, 2026', proctoring: 'Need to review', flags: 22, feedback: { submitted: false } },
  { name: 'Henry Young', email: 'henry.y@yopmail.com', assessment: 'Drake Tax Software Certification', type: 'MCQ', score: '-', result: '-', assignedOn: 'Jan 05, 2026', status: 'Pending', assignedBy: 'Thomas Anderson', completedOn: '-', proctoring: '-', flags: 0 },
  { name: 'Kavita Nair', email: 'kavita.n@yopmail.com', assessment: 'CCH Axcess + ProSystem fx Advanced', type: 'MCQ, Subjective, Case Study', score: '-', result: '-', assignedOn: 'Jan 03, 2026', status: 'Lapsed', assignedBy: 'Thomas Anderson', completedOn: '-', proctoring: '-', flags: 0 },
  { name: 'Patrick Collins', email: 'patrick.c@yopmail.com', assessment: 'Lacerte Tax Software Professional', type: 'Simulation', score: '77%', result: 'Pass', assignedOn: 'Dec 30, 2025', status: 'Completed', assignedBy: 'Thomas Anderson', completedOn: 'Dec 31, 2025', proctoring: 'Clean', flags: 0, feedback: { submitted: true, overallExperience: 4, assessmentClearBadge: 'Yes', hadIssuesBadge: 'No Issues', improvement: 'Very practical assessment.' } },
  { name: 'Diana Lopez', email: 'diana.l@yopmail.com', assessment: 'Tax Operations for Virtual Assistants Pro', type: 'MCQ, Simulation', score: '56%', result: 'Fail', assignedOn: 'Dec 28, 2025', status: 'Completed', assignedBy: 'Thomas Anderson', completedOn: 'Dec 29, 2025', proctoring: 'Need to review', flags: 6, feedback: { submitted: true, overallExperience: 3, assessmentClearBadge: 'Yes', hadIssuesBadge: 'No Issues', improvement: 'More time needed for simulation.' } },
  { name: 'Tanvi Joshi', email: 'tanvi.j@yopmail.com', assessment: 'NPO Audit Advanced Certification', type: 'MCQ, Subjective', score: '-', result: '-', assignedOn: 'Dec 25, 2025', status: 'Pending', assignedBy: 'Thomas Anderson', completedOn: '-', proctoring: '-', flags: 0 },
];

interface FilterDropdownProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: (string | { label: string; value: string })[];
}

const FilterDropdown = ({ label, value, onChange, options }: FilterDropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="r-filter-dropdown" ref={ref}>
      <span className="r-filter-dropdown-label">{label}</span>
      <div className={`r-filter-dropdown-trigger ${open ? 'open' : ''}`} onClick={() => setOpen((o) => !o)}>
        <span className="r-filter-dropdown-value">{value || `Select ${label}`}</span>
        <svg className={`r-filter-dropdown-chevron ${open ? 'open' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
      {open && (
        <div className="r-filter-dropdown-menu">
          {options.map((opt) => {
            const val = typeof opt === 'string' ? opt : opt.value;
            const lbl = typeof opt === 'string' ? opt : opt.label;
            return (
              <div key={val} className={`r-filter-dropdown-item ${value === val ? 'selected' : ''}`} onClick={() => { onChange(val); setOpen(false); }}>
                {lbl}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const RowsPerPageDropdown = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const options = [10, 25, 50];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="rpp-dropdown" ref={ref}>
      <button className="rpp-trigger" onClick={() => setOpen(!open)}>
        {value}
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
          <path d="M1 1L5 5L9 1" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="rpp-menu">
          {options.map((opt) => (
            <div key={opt} className={`rpp-item ${value === opt ? 'active' : ''}`} onClick={() => { onChange(opt); setOpen(false); }}>{opt}</div>
          ))}
        </div>
      )}
    </div>
  );
};

interface ReportsProps {
  onNavigate: (screen: string) => void;
  initialTab?: 'internal' | 'external';
}

const Reports = ({ onNavigate, initialTab = 'internal' }: ReportsProps) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [resultFilter, setResultFilter] = useState('');
  const [level, setLevel] = useState('All');
  const [domain, setDomain] = useState('All');
  const [assignedOn, setAssignedOn] = useState('');
  const [completedOn, setCompletedOn] = useState('');
  const [proctoringVerdict, setProctoringVerdict] = useState('All');
  const [assignedBy, setAssignedBy] = useState('All');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [activeTab, setActiveTab] = useState<'internal' | 'external'>(initialTab);
  const [activeFeedback, setActiveFeedback] = useState<ReportItem | null>(null);

  const currentData = activeTab === 'internal' ? internalData : externalData;
  const totalRecords = currentData.length;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);
  const pagedData = currentData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  // selectedRows stores global indices into currentData
  const pendingPageIndices = pagedData
    .map((item, i) => ({ globalIdx: (currentPage - 1) * rowsPerPage + i, isPending: item.status === 'Pending' }))
    .filter((r) => r.isPending)
    .map((r) => r.globalIdx);

  const allPendingOnPageSelected = pendingPageIndices.length > 0 && pendingPageIndices.every((i) => selectedRows.includes(i));

  const toggleRow = (globalIdx: number) => {
    setSelectedRows((prev) => prev.includes(globalIdx) ? prev.filter((i) => i !== globalIdx) : [...prev, globalIdx]);
  };

  const toggleAllPendingOnPage = () => {
    if (allPendingOnPageSelected) {
      setSelectedRows((prev) => prev.filter((i) => !pendingPageIndices.includes(i)));
    } else {
      setSelectedRows((prev) => [...new Set([...prev, ...pendingPageIndices])]);
    }
  };

  const isMultiSelect = selectedRows.length > 1;

  const clearFilters = () => {
    setSearch(''); setStatusFilter(''); setResultFilter(''); setLevel('All');
    setDomain('All'); setAssignedOn(''); setCompletedOn(''); setProctoringVerdict('All'); setAssignedBy('All');
  };

  return (
    <div className="reports-page">
      <div className="reports-fixed-header">
        <div className="breadcrumb">
          <span className="breadcrumb-link" onClick={() => onNavigate('dashboard')}>Home</span>
          <span className="breadcrumb-sep">&gt;</span>
          <span className="breadcrumb-link" onClick={() => onNavigate('assessments')}>Assessments</span>
          <span className="breadcrumb-sep">&gt;</span>
          <span className="breadcrumb-current">Assessment Reports</span>
        </div>

        <div className="reports-title-row">
          <div>
            <h1 className="page-title">Assessment Reports</h1>
            <p className="page-subtitle">Access candidate results and insights to make informed decisions.</p>
          </div>
          <div className="reports-actions">
            <span className="sample-report-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7162EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Sample Report
            </span>
            <div className="search-input-wrap">
              <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input type="text" className="search-input" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <button className={`btn-customize-reminders ${selectedRows.length > 0 ? 'has-selection' : ''}`}>
              Customize Reminders{selectedRows.length > 0 ? ` (${selectedRows.length})` : ''}
            </button>
          </div>
        </div>

        <div className="r-filters-row">
          <FilterDropdown label="Status" value={statusFilter} onChange={setStatusFilter} options={[{ label: 'All', value: '' }, { label: 'Pending', value: 'Pending' }, { label: 'Completed', value: 'Completed' }, { label: 'Lapsed - Not Attempted', value: 'Lapsed - Not Attempted' }]} />
          <FilterDropdown label="Result" value={resultFilter} onChange={setResultFilter} options={[{ label: 'All', value: '' }, { label: 'Pass', value: 'Pass' }, { label: 'Fail', value: 'Fail' }]} />
          <FilterDropdown label="Level" value={level} onChange={setLevel} options={['All', 'Basic', 'Intermediate', 'Advance']} />
          <FilterDropdown label="Domain" value={domain} onChange={setDomain} options={['All', 'Accounting', 'Auditing', 'Tax', 'Others']} />
          <div className="r-filter-date-wrap">
            <span className="r-filter-date-label">Assigned On</span>
            <input type="date" className="r-filter-date" value={assignedOn} onChange={(e) => setAssignedOn(e.target.value)} />
          </div>
          <div className="r-filter-date-wrap">
            <span className="r-filter-date-label">Completed On</span>
            <input type="date" className="r-filter-date" value={completedOn} onChange={(e) => setCompletedOn(e.target.value)} />
          </div>
          <FilterDropdown label="Proctoring Verdict" value={proctoringVerdict} onChange={setProctoringVerdict} options={['All', 'Clean', 'Need to review']} />
          <FilterDropdown label="Assigned By" value={assignedBy} onChange={setAssignedBy} options={['All']} />
          <button className="btn-apply">Apply</button>
          <button className="btn-clear" onClick={clearFilters}>Clear</button>
        </div>

        <div className="reports-tabs">
          <button className={`reports-tab ${activeTab === 'internal' ? 'active' : ''}`} onClick={() => { setActiveTab('internal'); setCurrentPage(1); setSelectedRows([]); }}>Internal Candidates</button>
          <button className={`reports-tab ${activeTab === 'external' ? 'active' : ''}`} onClick={() => { setActiveTab('external'); setCurrentPage(1); setSelectedRows([]); }}>External Candidates</button>
        </div>
      </div>

      <div className="reports-scroll-body">
      <div className="report-table-wrap">
        <table className="report-table">
          <thead>
            <tr>
              <th className="th-check"><input type="checkbox" checked={allPendingOnPageSelected && pendingPageIndices.length > 0} onChange={toggleAllPendingOnPage} disabled={pendingPageIndices.length === 0} /></th>
              <th>Candidate Name</th>
              {activeTab === 'internal' && <th>Reporting Manager</th>}
              <th>Assessment Name</th>
              <th>Type</th>
              <th>Score</th>
              <th>Result</th>
              <th>Assigned On</th>
              <th>Status</th>
              <th>Assigned By</th>
              <th>Feedback</th>
              <th>Completed On</th>
              <th>Proctoring Verdict</th>
              <th>No. of Flags</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pagedData.map((item, idx) => {
              const globalIdx = (currentPage - 1) * rowsPerPage + idx;
              const isPending = item.status === 'Pending';
              return (
              <tr key={globalIdx} className={selectedRows.includes(globalIdx) ? 'row-selected' : ''}>
                <td className="td-check">
                  <input type="checkbox"
                    checked={selectedRows.includes(globalIdx)}
                    onChange={() => toggleRow(globalIdx)}
                    disabled={!isPending}
                    className={!isPending ? 'checkbox-disabled' : ''}
                  />
                </td>
                <td>
                  <div className="candidate-cell">
                    <span className="candidate-name">{item.name}</span>
                    <span className="candidate-email">{item.email}</span>
                  </div>
                </td>
                {activeTab === 'internal' && <td>{item.reportingManager || '-'}</td>}
                <td className="td-assessment">
                  <span className="td-assessment-text" data-tooltip={item.assessment}>{item.assessment}</span>
                </td>
                <td>
                  <div className="type-chips">
                    {item.type.split(', ').map((t, i) => (
                      <span key={i} className={`type-chip type-chip--${t.toLowerCase()}`}>{t}</span>
                    ))}
                  </div>
                </td>
                <td>{item.score}</td>
                <td>
                  {item.result === 'Pass' && <span className="badge badge-pass">Pass</span>}
                  {item.result === 'Fail' && <span className="badge badge-fail">Fail</span>}
                  {item.result === "Doesn't Match" && <span className="badge badge-fail">Doesn't Match</span>}
                  {item.result === '-' && <span>-</span>}
                </td>
                <td className="td-date">{item.assignedOn}</td>
                <td>
                  {item.status === 'Completed' && <span className="badge badge-completed">Completed</span>}
                  {item.status === 'Lapsed' && <span className="badge badge-lapsed">Lapsed</span>}
                  {item.status === 'Pending' && <span className="badge badge-pending">Pending</span>}
                </td>
                <td>{item.assignedBy}</td>
                <td>
                  {item.status === 'Completed' ? (
                    <span className="feedback-link" onClick={() => setActiveFeedback(item)}>View</span>
                  ) : (
                    <span className="feedback-link feedback-link--disabled">View</span>
                  )}
                </td>
                <td className="td-date">{item.completedOn}</td>
                <td>
                  {item.proctoring === 'Need to review' && <span className="badge badge-review">Need to review</span>}
                  {item.proctoring === 'Get Rate' && <span className="badge badge-getrate">Get Rate</span>}
                  {item.proctoring === 'Clean' && <span className="badge badge-clean">Clean</span>}
                </td>
                <td>{item.flags > 0 ? <span className="flags-badge">{item.flags}</span> : <span className="flags-none">-</span>}</td>
                <td>
                  {item.status === 'Completed' && !isMultiSelect ? (
                    <div className="action-icons">
                      <button className="action-icon-btn" title="Download Report">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7162EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                      </button>
                      <button className="action-icon-btn" title="View">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7162EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      </button>
                    </div>
                  ) : isMultiSelect ? (
                    <span className="action-disabled">-</span>
                  ) : null}
                </td>
              </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="pagination-bar">
        <div className="pagination-info">
          Showing
          <RowsPerPageDropdown value={rowsPerPage} onChange={(v) => { setRowsPerPage(v); setCurrentPage(1); }} />
          of <strong>{totalRecords}</strong> Records
        </div>
        <div className="pagination-controls">
          <button className="pagination-btn pagination-nav" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>&lt; Back</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
            if (totalPages <= 7 || p === 1 || p === totalPages || (p >= currentPage - 1 && p <= currentPage + 1)) {
              return <button key={p} className={`pagination-btn ${currentPage === p ? 'active' : ''}`} onClick={() => setCurrentPage(p)}>{p}</button>;
            }
            if (p === 2 && currentPage > 3) return <span key={p} className="pagination-ellipsis">...</span>;
            if (p === totalPages - 1 && currentPage < totalPages - 2) return <span key={p} className="pagination-ellipsis">...</span>;
            return null;
          })}
          <button className="pagination-btn pagination-nav" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next &gt;</button>
        </div>
      </div>
      </div>

      <FeedbackDrawer
        open={activeFeedback !== null}
        onClose={() => setActiveFeedback(null)}
        feedback={activeFeedback?.feedback}
        userName={activeFeedback?.name || ''}
        assessmentName={activeFeedback?.assessment || ''}
      />
    </div>
  );
};

export default Reports;
