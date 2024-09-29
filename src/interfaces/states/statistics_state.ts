import ApiInterface from "../ApiInterface";

interface StatisticsState extends ApiInterface{
    statistics: {
        articles: number;
        events: number;
        managers: number;
        users: number;
        announces: number;
        contact_submissions: number
    };
    userGraph: Array<{
        count: number,
        month: string
    }>;
    groupedStatistics: Array<{
        month: string,
        events: number,
        articles: number,
        announces: number
    }>;

    articlesByCategory: Array<{
        category: string,
        count: number
    }>;
}


export default StatisticsState