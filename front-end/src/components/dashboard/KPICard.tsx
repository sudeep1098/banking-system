import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

interface KPICardProps {
    title: string;
    value: string;
    change?: {
        value: number;
        type: 'increase' | 'decrease';
    };
    icon: React.ReactNode;
    color?: string;
}

export const KPICard: React.FC<KPICardProps> = ({
    title,
    value,
    change,
    icon,
    color = 'primary'
}) => {
    return (
        <Card className="h-full">
            <CardContent>
                <Box className="flex items-center justify-between mb-2">
                    <Typography color="textSecondary" variant="body2">
                        {title}
                    </Typography>
                    <Box className={`text-${color}-500`}>
                        {icon}
                    </Box>
                </Box>

                <Typography variant="h4" className="font-bold text-gray-900 mb-2">
                    {value}
                </Typography>

                {change && (
                    <Box className="flex items-center">
                        {change.type === 'increase' ? (
                            <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                        ) : (
                            <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                        )}
                        <Typography
                            variant="body2"
                            className={`font-medium ${change.type === 'increase' ? 'text-green-600' : 'text-red-600'
                                }`}
                        >
                            {change.value > 0 ? '+' : ''}{change.value}%
                        </Typography>
                        <Typography variant="body2" className="text-gray-500 ml-1">
                            vs last month
                        </Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};
