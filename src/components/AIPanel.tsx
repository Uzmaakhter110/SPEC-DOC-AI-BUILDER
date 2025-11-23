import { useState, useEffect, useRef } from 'react';
import { Sparkles, Send, Loader2, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { voiceService } from '../lib/voiceService';

interface AIPanelProps {
  onApplyChanges: (instruction: string) => Promise<void>;
  isProcessing: boolean;
}

export function AIPanel({ onApplyChanges, isProcessing }: AIPanelProps) {
  const [instruction, setInstruction] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const speakingCheckInterval = useRef<number | null>(null);

  useEffect(() => {
    setVoiceSupported(voiceService.isSupported());
  }, []);

  useEffect(() => {
    if (isSpeaking) {
      speakingCheckInterval.current = window.setInterval(() => {
        if (!voiceService.isSpeaking()) {
          setIsSpeaking(false);
        }
      }, 100);
    } else {
      if (speakingCheckInterval.current) {
        clearInterval(speakingCheckInterval.current);
        speakingCheckInterval.current = null;
      }
    }

    return () => {
      if (speakingCheckInterval.current) {
        clearInterval(speakingCheckInterval.current);
      }
    };
  }, [isSpeaking]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (instruction.trim() && !isProcessing) {
      const instructionText = instruction.trim();
      await onApplyChanges(instructionText);

      if (voiceSupported) {
        const response = `Processing your request: ${instructionText}. Changes will be applied to your document.`;
        voiceService.speak(response, () => setIsSpeaking(false));
        setIsSpeaking(true);
      }

      setInstruction('');
    }
  };

  const toggleVoiceInput = () => {
    if (isListening) {
      voiceService.stopListening();
      setIsListening(false);
    } else {
      setIsListening(true);
      voiceService.startListening(
        (text) => {
          setInstruction(text);
          setIsListening(false);
        },
        (error) => {
          console.error('Voice recognition error:', error);
          setIsListening(false);
        }
      );
    }
  };

  const toggleSpeech = () => {
    if (isSpeaking) {
      voiceService.stopSpeaking();
      setIsSpeaking(false);
    }
  };

  const suggestions = [
    'Add a section for user roles and permissions',
    'Expand the testing requirements with specific test cases',
    'Include error handling scenarios',
    'Add security and authorization details',
    'Include data migration requirements',
  ];

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="p-6 bg-gray-800 border-b border-gray-700 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">AI Assistant</h2>
        </div>
        <p className="text-sm text-gray-300">
          Describe the changes you want to make to your document
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-200 mb-3">
            Suggestion Prompts
          </h3>
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setInstruction(suggestion)}
                disabled={isProcessing}
                className="w-full text-left px-4 py-2.5 bg-gray-800 rounded-lg border border-gray-700 hover:border-purple-500 hover:bg-gray-750 transition-colors text-sm text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 text-sm text-purple-200">
          <p className="font-medium mb-1">Tips for best results:</p>
          <ul className="space-y-1 text-xs text-purple-300">
            <li>• Be specific about which section to modify</li>
            <li>• Describe the content you want added or changed</li>
            <li>• Include relevant technical details if applicable</li>
          </ul>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 bg-gray-800 border-t border-gray-700">
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="instruction" className="block text-sm font-medium text-gray-200">
              Your Instruction
            </label>
            {voiceSupported && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleVoiceInput}
                  disabled={isProcessing || isSpeaking}
                  className={`p-2 rounded-lg transition-all ${
                    isListening
                      ? 'bg-red-600 hover:bg-red-700 animate-pulse'
                      : 'bg-purple-600 hover:bg-purple-700'
                  } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                  title={isListening ? 'Stop listening' : 'Start voice input'}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
                {isSpeaking && (
                  <button
                    type="button"
                    onClick={toggleSpeech}
                    className="p-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white animate-pulse"
                    title="Stop speaking"
                  >
                    <VolumeX className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>
          <textarea
            id="instruction"
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            placeholder={isListening ? "Listening... Speak now!" : "Type or use voice input to describe changes..."}
            disabled={isProcessing || isListening}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-gray-200 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none disabled:bg-gray-800 disabled:cursor-not-allowed"
            rows={4}
          />
          {isListening && (
            <p className="mt-2 text-xs text-purple-400 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              Recording... Speak clearly into your microphone
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={!instruction.trim() || isProcessing || isListening}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-medium hover:from-purple-700 hover:to-purple-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/50"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Apply Changes</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
