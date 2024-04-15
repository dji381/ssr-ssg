<?php

namespace App\Controller;

use GuzzleHttp\Client;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\KernelInterface;

class DefaultController extends AbstractController
{
    public function openFile(string $path,KernelInterface $kernel)
    {
        // Construire le chemin absolu vers index.html dans le dossier public
        $cheminAbsolu = $kernel->getProjectDir() . $path;

        if (file_exists($cheminAbsolu)) {
            $ressource = fopen($cheminAbsolu, 'rb');
            if ($ressource === false) {
                // Gérer l'erreur si le fichier ne peut pas être ouvert
                throw new \Exception('Impossible d\'ouvrir le fichier test.html');
            }
        
            $ssr = fread($ressource, filesize($cheminAbsolu));
            fclose($ressource);
            return $ssr;
        } else {
            // Gérer le cas où le fichier n'existe pas
            throw new \Exception('Le fichier index.html n\'existe pas');
        }
    }
    #[Route('/test')]
    public function number(KernelInterface $kernel): Response
    {   
       
        $ssr = $this->openFile("/assets/dist/static/test.html",$kernel);
        $preloadLinks = $this->openFile("/assets/dist/static/test-pre.html",$kernel);
        return $this->render('base.html.twig', ['ssr' => $ssr, 'preloaded' => $preloadLinks]);
    }
}