import React, { useState, useRef } from 'react';
import { FaUser, FaUniversity, FaFileInvoice, FaFileUpload, FaFilePdf, FaFileImage, FaCopy } from 'react-icons/fa';
import { toast } from 'react-toastify';

const BankTransfer = ({ amount, currency = 'TZS', onPaymentSubmitted, onError }) => {
  const [formData, setFormData] = useState({
    accountHolderName: '',
    bankName: '',
    accountNumber: '',
    transactionId: '',
    paymentProof: null,
    termsAccepted: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const fileInputRef = useRef(null);

  const bankAccounts = [
    { name: 'NMB Bank', number: '1234567890', branch: 'Dar es Salaam', currency: 'TZS' },
    { name: 'CRDB Bank', number: '0987654321', branch: 'Dar es Salaam', currency: 'TZS' },
    { name: 'NBC Bank', number: '5678901234', branch: 'Dar es Salaam', currency: 'TZS' },
    { name: 'Exim Bank', number: '4321567890', branch: 'Dar es Salaam', currency: 'USD' },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file' && files && files[0]) {
      const file = files[0];
      const fileType = file.type;
      const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      
      if (!validTypes.includes(fileType)) {
        setErrors(prev => ({
          ...prev,
          paymentProof: 'Please upload a valid image (JPEG, PNG) or PDF file'
        }));
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({
          ...prev,
          paymentProof: 'File size should be less than 5MB'
        }));
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        paymentProof: file
      }));
      
      // Create preview for images
      if (fileType.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewUrl('');
      }
      
      // Clear error if file is valid
      if (errors.paymentProof) {
        setErrors(prev => ({
          ...prev,
          paymentProof: null
        }));
      }
      
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.accountHolderName.trim()) {
      newErrors.accountHolderName = 'Account holder name is required';
    }
    
    if (!formData.bankName) {
      newErrors.bankName = 'Please select your bank';
    }
    
    if (!formData.accountNumber) {
      newErrors.accountNumber = 'Account number is required';
    } else if (!/^\d{6,20}$/.test(formData.accountNumber)) {
      newErrors.accountNumber = 'Please enter a valid account number';
    }
    
    if (!formData.transactionId) {
      newErrors.transactionId = 'Transaction ID is required';
    }
    
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions';
    }
    
    return newErrors;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, you would upload the file to your server here
      // and then submit the form data along with the file URL
      const paymentData = {
        ...formData,
        amount,
        currency,
        submittedAt: new Date().toISOString(),
        reference: `BANK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      };
      
      console.log('Submitting bank transfer details:', paymentData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (onPaymentSubmitted) {
        onPaymentSubmitted(paymentData);
      }
      
      // Show success message
      toast.success('Bank transfer details submitted successfully!');
      
    } catch (error) {
      console.error('Error submitting bank transfer:', error);
      
      if (onError) {
        onError(error.message || 'Failed to submit bank transfer details');
      }
      
      toast.error('Failed to submit bank transfer. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.info('Copied to clipboard!');
  };
  
  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };
  
  const removeFile = () => {
    setFormData(prev => ({
      ...prev,
      paymentProof: null
    }));
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Bank Transfer</h2>
        <p className="text-gray-600 mt-1">
          Transfer funds directly from your bank account
        </p>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
        <h3 className="font-medium text-blue-800 mb-2">Our Bank Details</h3>
        <div className="space-y-2 text-sm">
          {bankAccounts.map((account, index) => (
            <div key={index} className="bg-white p-3 rounded border border-gray-200">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">{account.name}</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {account.currency}
                </span>
              </div>
              <div className="flex justify-between items-center text-gray-700">
                <span>Account: {account.number}</span>
                <button 
                  onClick={() => handleCopyToClipboard(account.number)}
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-xs"
                  title="Copy account number"
                >
                  <FaCopy size={12} />
                </button>
              </div>
              <div className="text-xs text-gray-500">Branch: {account.branch}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-blue-700 mt-3">
          Please use your order ID as the payment reference.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Account Holder Name */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <FaUser className="text-gray-500" />
            Your Full Name (as per bank account) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="accountHolderName"
            value={formData.accountHolderName}
            onChange={handleChange}
            placeholder="John Doe"
            className={`w-full p-2.5 border ${
              errors.accountHolderName ? 'border-red-300' : 'border-gray-300'
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            disabled={isSubmitting}
          />
          {errors.accountHolderName && (
            <p className="text-sm text-red-600">{errors.accountHolderName}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Bank Name */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaUniversity className="text-gray-500" />
              Your Bank <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                className={`w-full p-2.5 border ${
                  errors.bankName ? 'border-red-300' : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white`}
                disabled={isSubmitting}
              >
                <option value="">Select your bank</option>
                {bankAccounts.map((bank, index) => (
                  <option key={index} value={bank.name}>
                    {bank.name}
                  </option>
                ))}
                <option value="other">Other Bank</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            {errors.bankName && (
              <p className="text-sm text-red-600">{errors.bankName}</p>
            )}
          </div>
          
          {/* Account Number */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Your Account Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              placeholder="e.g., 0987654321"
              className={`w-full p-2.5 border ${
                errors.accountNumber ? 'border-red-300' : 'border-gray-300'
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              disabled={isSubmitting}
            />
            {errors.accountNumber && (
              <p className="text-sm text-red-600">{errors.accountNumber}</p>
            )}
          </div>
        </div>
        
        {/* Transaction ID */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <FaFileInvoice className="text-gray-500" />
            Transaction/Reference Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="transactionId"
            value={formData.transactionId}
            onChange={handleChange}
            placeholder="e.g., TX123456789"
            className={`w-full p-2.5 border ${
              errors.transactionId ? 'border-red-300' : 'border-gray-300'
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            disabled={isSubmitting}
          />
          <p className="text-xs text-gray-500">
            The transaction ID/reference number from your bank transfer
          </p>
          {errors.transactionId && (
            <p className="text-sm text-red-600">{errors.transactionId}</p>
          )}
        </div>
        
        {/* Payment Proof Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Upload Payment Proof (Optional)
          </label>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleChange}
            accept="image/*,.pdf"
            className="hidden"
            disabled={isSubmitting}
          />
          
          {!formData.paymentProof ? (
            <div 
              onClick={handleFileButtonClick}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="flex flex-col items-center justify-center">
                <FaFileUpload className="text-3xl text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, or PDF (max 5MB)
                </p>
              </div>
            </div>
          ) : (
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {formData.paymentProof.type.startsWith('image/') ? (
                    <FaFileImage className="text-blue-500 text-xl" />
                  ) : (
                    <FaFilePdf className="text-red-500 text-xl" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                      {formData.paymentProof.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(formData.paymentProof.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  className="text-red-500 hover:text-red-700"
                  disabled={isSubmitting}
                >
                  Remove
                </button>
              </div>
              
              {previewUrl && (
                <div className="mt-3 border-t pt-3">
                  <p className="text-xs text-gray-500 mb-2">Preview:</p>
                  <img 
                    src={previewUrl} 
                    alt="Payment proof preview" 
                    className="max-h-40 rounded border border-gray-200"
                  />
                </div>
              )}
            </div>
          )}
          
          {errors.paymentProof && (
            <p className="text-sm text-red-600">{errors.paymentProof}</p>
          )}
        </div>
        
        {/* Terms and Conditions */}
        <div className="pt-2">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="termsAccepted"
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className={`h-4 w-4 rounded ${
                  errors.termsAccepted ? 'border-red-300' : 'border-gray-300'
                } text-blue-600 focus:ring-blue-500`}
                disabled={isSubmitting}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="font-medium text-gray-700">
                I confirm that I have made the bank transfer and the details provided are correct
              </label>
              <p className="text-gray-500">
                Your order will be processed once we verify the payment. This may take 1-2 business days.
              </p>
            </div>
          </div>
          {errors.termsAccepted && (
            <p className="mt-1 text-sm text-red-600">{errors.termsAccepted}</p>
          )}
        </div>
        
        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 ${
              isSubmitting
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            } transition-colors`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              'Submit Payment Details'
            )}
          </button>
        </div>
      </form>
      
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-sm text-yellow-700">
        <h4 className="font-medium mb-1">Important Notice:</h4>
        <p>Please note that your order will remain pending until we verify your payment. This usually takes 1-2 business days. You will receive a confirmation email once your payment is verified.</p>
      </div>
    </div>
  );
};

export default BankTransfer;