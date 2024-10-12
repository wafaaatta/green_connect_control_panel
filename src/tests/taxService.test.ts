// taxService.test.js

import axios from "axios";
import taxApi from "../utils/taxApi";
import { calculateTax } from "../utils/taxService";
import ArticleCategory from "../interfaces/ArticleCategory";
import axiosHttp from "../utils/axios_client";


// // Mock the taxApi.getTaxRate function

describe('calculateTax', () => {
    // beforeEach(() => {
    //     jest.spyOn(taxApi, 'getTaxRate').mockReturnValue(0.2);
    // })
  it('should calculate tax using the mocked tax rate', async () => {
    const result = calculateTax(100); // Calling with 100
    jest.mock('../utils/axios_client')
    const dummy = [
        { id: 1, name: 'Category 1', created_at: '2022-01-01' },
        { id: 2, name: 'Category 2', created_at: '2022-01-02' },
    ]
    jest.spyOn(axiosHttp, 'get').mockResolvedValue({ data:  dummy})

    const response = await axiosHttp.get('/article-categories')
    console.log(response.data);
    
    expect(response.data).toMatchObject(dummy)
    expect(result).toBe(20); // Expecting 20 since 100 * 0.2 = 20
  });
});


