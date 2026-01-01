import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Head, router } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, Flag, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Question {
    id: number;
    question: string;
    options: string[];
}

interface Answer {
    questionId: number;
    answer: number | null;
    isDoubtful: boolean;
}

// Sample questions - replace with actual data from backend
const sampleQuestions: Question[] = [
    {
        id: 1,
        question:
            'Mita: "Excuse me, I\'d like to ask something." Arya: "Please, go on." Mita: "Where is the location of XXI Movie theatre?" Arya: "..." Mita: "Okay, thank you." What is the best expression used to answer Mita\'s question?',
        options: [
            'I was so embarrassed',
            "It's in front of Sahabat Grand Mall",
            'Why do you so nervous',
            'I think the movie is not good enough',
            'I think the movie theatre is so big',
        ],
    },
    // Add more questions as needed
];

export default function CBTTest() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Answer[]>(
        Array.from({ length: 35 }, (_, i) => ({
            questionId: i + 1,
            answer: null,
            isDoubtful: false,
        })),
    );
    const [timeRemaining, setTimeRemaining] = useState(120 * 60); // 120 minutes in seconds

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 0) {
                    clearInterval(timer);
                    handleFinishTest();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const handleAnswerSelect = (answerIndex: number) => {
        setAnswers((prev) =>
            prev.map((a) =>
                a.questionId === currentQuestion + 1
                    ? { ...a, answer: answerIndex, isDoubtful: false }
                    : a,
            ),
        );
    };

    const handleDoubtful = () => {
        setAnswers((prev) =>
            prev.map((a) =>
                a.questionId === currentQuestion + 1
                    ? { ...a, isDoubtful: true }
                    : a,
            ),
        );
        handleNext();
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleNext = () => {
        if (currentQuestion < 34) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handleQuestionClick = (index: number) => {
        setCurrentQuestion(index);
    };

    const handleFinishTest = () => {
        if (confirm('Apakah Anda yakin ingin menyelesaikan ujian?')) {
            // Submit answers to backend
            router.post('/cbt/submit', { answers });
        }
    };

    const getQuestionStatus = (index: number) => {
        const answer = answers[index];
        if (answer.isDoubtful) return 'doubtful';
        if (answer.answer !== null) return 'answered';
        return 'unanswered';
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'answered':
                return 'bg-green-500 hover:bg-green-600';
            case 'doubtful':
                return 'bg-orange-500 hover:bg-orange-600';
            default:
                return 'bg-gray-400 hover:bg-gray-500';
        }
    };

    const question = sampleQuestions[0]; // Using sample question

    return (
        <>
            <Head title="CBT - Ujian" />

            {/* Fullscreen layout without sidebar */}
            <div className="flex min-h-screen flex-col bg-gray-100">
                {/* Header */}
                <div className="flex items-center justify-between bg-[#1e3a5f] px-6 py-4 text-white">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-bold">SISWA</h1>
                        <div className="text-sm">
                            <p>Selamat datang</p>
                            <p className="font-semibold">RAHMANDA SAFITRI</p>
                        </div>
                    </div>
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => router.visit('/dashboard')}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                </div>

                {/* Main Content */}
                <div className="flex flex-1 gap-4 p-4">
                    {/* Left Side - Question */}
                    <div className="flex flex-1 flex-col gap-4">
                        {/* Question Header */}
                        <Card className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium">
                                        SOAL NO.
                                    </span>
                                    <span className="rounded bg-[#1e3a5f] px-4 py-1 font-bold text-white">
                                        {currentQuestion + 1}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 rounded bg-gray-200 px-4 py-2">
                                    <span className="text-sm font-medium">
                                        SISA WAKTU
                                    </span>
                                    <span className="rounded bg-[#1e3a5f] px-3 py-1 font-mono font-bold text-white">
                                        {formatTime(timeRemaining)}
                                    </span>
                                </div>
                            </div>
                        </Card>

                        {/* Question Content */}
                        <Card className="flex-1 p-6">
                            <div className="space-y-6">
                                <p className="leading-relaxed text-gray-800">
                                    {question.question}
                                </p>

                                <div className="space-y-3">
                                    {question.options.map((option, index) => (
                                        <label
                                            key={index}
                                            className="flex cursor-pointer items-start gap-3 rounded-lg border-2 p-4 transition-colors hover:bg-gray-50"
                                        >
                                            <input
                                                type="radio"
                                                name="answer"
                                                checked={
                                                    answers[currentQuestion]
                                                        .answer === index
                                                }
                                                onChange={() =>
                                                    handleAnswerSelect(index)
                                                }
                                                className="mt-1 h-5 w-5 text-[#1e3a5f]"
                                            />
                                            <span className="text-gray-800">
                                                {option}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </Card>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between gap-4">
                            <Button
                                variant="outline"
                                onClick={handlePrevious}
                                disabled={currentQuestion === 0}
                                className="flex-1"
                            >
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                SOAL SEBELUMNYA
                            </Button>

                            <Button
                                variant="outline"
                                onClick={handleDoubtful}
                                className="flex-1 bg-orange-500 text-white hover:bg-orange-600"
                            >
                                <Flag className="mr-2 h-4 w-4" />
                                RAGU-RAGU
                            </Button>

                            <Button
                                variant="outline"
                                onClick={handleNext}
                                disabled={currentQuestion === 34}
                                className="flex-1"
                            >
                                SOAL SELANJUTNYA
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Right Side - Question Navigator */}
                    <Card className="h-fit w-80 p-6">
                        <div className="space-y-4">
                            <h2 className="text-center text-lg font-bold">
                                NOMOR SOAL
                            </h2>

                            {/* Question Grid */}
                            <div className="grid grid-cols-5 gap-2">
                                {answers.map((_, index) => {
                                    const status = getQuestionStatus(index);
                                    return (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                handleQuestionClick(index)
                                            }
                                            className={cn(
                                                'aspect-square rounded text-sm font-semibold text-white transition-colors',
                                                getStatusColor(status),
                                                currentQuestion === index &&
                                                    'ring-4 ring-blue-300',
                                            )}
                                        >
                                            {index + 1}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Legend */}
                            <div className="space-y-2 border-t pt-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="h-6 w-6 rounded bg-green-500"></div>
                                    <span>= Sudah dijawab</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="h-6 w-6 rounded bg-orange-500"></div>
                                    <span>= Ragu-ragu</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="h-6 w-6 rounded bg-gray-400"></div>
                                    <span>= Belum dijawab</span>
                                </div>
                            </div>

                            {/* Finish Button */}
                            <Button
                                onClick={handleFinishTest}
                                className="w-full bg-red-600 py-3 font-bold text-white hover:bg-red-700"
                            >
                                HENTIKAN UJIAN
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
}
