/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.java.servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author kohila
 * adding a comment
 */
@WebServlet(name = "ProductServlet", urlPatterns = {"/ProductServlet/*"})
public class ProductServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
response.setContentType("text/json");  
        PrintWriter out = response.getWriter();
        String username="admin";
    String password="password";
    URL urlForGetRequest = new URL("http://interview-tech-testing.herokuapp.com/product-details/p60211771");

    String readLine = null;
    String auth = Base64.getEncoder().encodeToString((username+":"+password).getBytes(StandardCharsets.UTF_8));
    

    HttpURLConnection connection = (HttpURLConnection) urlForGetRequest.openConnection();

    connection.setRequestMethod("GET");
connection.setRequestProperty("Authorization", "Basic "+auth);


    int responseCode = connection.getResponseCode();

    if (responseCode == HttpURLConnection.HTTP_OK) {

        BufferedReader in = new BufferedReader(
                
                new InputStreamReader(connection.getInputStream()));
        StringBuffer responseOut = new StringBuffer();
        while ((readLine = in.readLine()) != null) {

            responseOut.append(readLine);
            
        }
        ;
        in .close();
        // print result
        
        out.print(responseOut.toString());
        

        //GetAndPost.POSTRequest(response.toString());

    } else {

        System.out.println("GET NOT WORKED");

    }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
