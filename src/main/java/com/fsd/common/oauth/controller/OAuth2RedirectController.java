package com.fsd.common.oauth.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/oauth2")
public class OAuth2RedirectController {

    @GetMapping("/redirect")
    public String redirect() {
        return "oauth2/redirect";
    }
} 