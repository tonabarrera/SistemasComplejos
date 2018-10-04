#include <stdio.h>
int main(int argc, char *argv[]){
    int i=0;
    int j=0;
    int x=0;
    	for (j = 1; j < 262145; j++)
    	{
    		for (i = 0; i < 262144; i++)
    		{
    			if((j%1000000)==0){
    				printf("%d\n", j);
    			}
    		}
    	}
    printf("Termine");
}