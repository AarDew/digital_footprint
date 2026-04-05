import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
});

// Mock responses for testing
const mockResponse = (type, value) => {
  const isHighRisk = value.includes('evil') || value.includes('malicious');
  const isMediumRisk = value.includes('test') || value.includes('unknown');

  return {
    inputType: type,
    inputValue: value,
    riskScore: isHighRisk ? 90 : isMediumRisk ? 50 : 10,
    riskLevel: isHighRisk ? "High" : isMediumRisk ? "Medium" : "Low",
    reasons: isHighRisk 
      ? ["Malware signature detected", "Known bad domain"] 
      : isMediumRisk 
        ? ["Suspicious pattern", "Unverified source"] 
        : ["No known threats", "Clear reputation"],
    recommendations: isHighRisk
      ? ["Block immediately", "Run full system scan"]
      : isMediumRisk
        ? ["Monitor closely", "Verify sender"]
        : ["No action needed"]
  };
};

export const scanURL = async (url) => {
  // Mocking API call
  return new Promise((resolve) => setTimeout(() => resolve(mockResponse("URL", url)), 1000));
};

export const scanEmail = async (emailText) => {
  return new Promise((resolve) => setTimeout(() => resolve(mockResponse("Email", emailText)), 1000));
};

export const scanFile = async (filename) => {
  return new Promise((resolve) => setTimeout(() => resolve(mockResponse("File", filename)), 1000));
};

export const scanIdentity = async (username) => {
  return new Promise((resolve) => setTimeout(() => resolve(mockResponse("Identity", username)), 1000));
};
